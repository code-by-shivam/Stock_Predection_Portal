from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from .serializer import StockPredictionSerializer
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from datetime import datetime
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler 
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score


# Create your views here.
class StockPredictionViewAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']


            #Fetching Data
            
            now=datetime.now()
            start = datetime(now.year - 10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            if df.empty:
                return Response({'error':'No data found for the given ticker',
                'status': status.HTTP_404_NOT_FOUND 
                })
            df=df.reset_index() 
            #Generating Basic Plot
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Close Price')
            plt.title(f"Close Price of {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend()


            #Save the plot to a file
            plot_img_path = f'{ticker }_plot.png'
            plot_img = save_plot(plot_img_path)
            

            #100 Days moving average
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Close Price')
            plt.plot(ma100,'r', label='100 MA')
            plt.title(f"100 Days Moving Average of {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend() 
            plot_img_path = f'{ticker }_100_dma.png'
            plot_100_dma = save_plot(plot_img_path)



            #200 Days moving average
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Close Price')
            plt.plot(ma100,'r', label='100 MA')
            plt.plot(ma200,'g', label='200 MA')
            plt.title(f"200 Days Moving Average of {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend() 
            plot_img_path = f'{ticker }_200_dma.png'
            plot_200_dma = save_plot(plot_img_path)

            #Splitting Data into Training and Testing
            data_training =pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])

            #Scaling Down the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1))
            scaler.fit(data_training)

            #Load Ml Model
            model_path = os.path.join(settings.BASE_DIR, 'stock_prediction_model.keras')
            model = load_model(model_path)

            #preparing Test Data
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.transform(final_df)

            x_test = []
            y_test = []

            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])
            x_test, y_test = np.array(x_test), np.array(y_test)

            #Making Prediction
            y_predicted = model.predict(x_test)

            #Revert the scaling price to original price
            y_predicted = scaler.inverse_transform(y_predicted)
            y_test = scaler.inverse_transform(y_test.reshape(-1,1))

            
            #plot the final predection
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(y_test,'b', label='Original Price')
            plt.plot(y_predicted,'r', label='Predicted Price')
            plt.title(f"Final Prediction of {ticker}")
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend()
            plot_img_path = f'{ticker }_final_prediction.png'
            plot_final_prediction = save_plot(plot_img_path)

            #Model Evaluation
            

            #Mean Squared error
            mse =mean_squared_error(y_test, y_predicted)

            #Root Mean Squared error
            rmse = np.sqrt(mse)

            # r-square error
            r2 = r2_score(y_test, y_predicted)



            


            return Response({'ticker': ticker,
            'plot_img':plot_img,
            'plot_100_dma':plot_100_dma,
            'plot_200_dma':plot_200_dma,
            'plot_final_prediction':plot_final_prediction,
            'mse':mse,
            'rmse':rmse,
            'r2':r2
            }) 

        