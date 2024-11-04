# Taxi Demand Prediction and Fleet Optimization

This project aims to predict hourly taxi demand in the Bronx, New York, and optimize fleet sizing to meet this demand efficiently. By leveraging historical taxi and weather data, this project builds a robust demand forecasting model and provides insights for operational planning.

## Project Overview
The goal is to accurately forecast hourly taxi demand and recommend optimal fleet sizes for efficient resource management. By predicting demand patterns, we can improve taxi availability and customer satisfaction, while optimizing operational costs.

## Problem Statement
We aim to forecast hourly taxi demand and calculate the number of taxis required to meet this demand. This project uses historical taxi trip data and weather conditions to predict demand and optimize fleet size based on these forecasts.

## Data
The project uses three main datasets:
- **Taxi Trip Data**: Records of individual taxi trips, including pickup/drop-off times, passenger count, and trip distance.
- **Zone Data**: Information about NYC taxi zones to filter data for the Bronx.
- **Weather Data**: Hourly weather observations, including temperature, precipitation, and snowfall.

## Solution Approach
The solution is organized into four main steps:
1. **Data Cleaning**: Preprocessing the taxi, zone, and weather data, including handling missing values, removing duplicates, and filtering Bronx-specific data.
2. **Exploratory Data Analysis (EDA) and Feature Engineering**:
   - **EDA**: Identify demand patterns by time of day, day of the week, and weather effects.
   - **Feature Engineering**: Create time-based features (hour, day, month) and demand lag features (3-hour, 6-hour lags) for better predictions.
3. **Model Development**: Train and evaluate multiple machine learning models (Linear Regression, Ridge, Random Forest, XGBoost) to forecast demand.
4. **Forecasting and Fleet Optimization**: Use the best model to predict future demand and determine the optimal number of taxis required to meet this demand.

## Project Structure
- **data**: contains raw and cleaned datasets
- **figures**: contains all the figures for EDA and forecasts
- **models**: contains the best model as a .joblib file
- **notebooks**: contains all the notebooks for carrying out the analysis and doing forecasts
- **reports**: contains the master report of the project
- **requirements.txt**: file to be used by conda to replicate the development environment

## Usage
1. **Data Cleaning**: Run `1_data_cleaning.ipynb` to preprocess and clean the data.
2. **EDA and Feature Engineering**: Run `2_eda_feat_engg.ipynb` to perform data analysis and create new features.
3. **Model Development**: Run `3_model_dev.ipynb` to train and evaluate different models for demand prediction.
4. **Forecasting**: Run `4_forecasting.ipynb` to generate demand forecasts and calculate optimal fleet sizes.