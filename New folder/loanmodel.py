# -*- coding: utf-8 -*-
"""Loan Model Training and Saving Script"""

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from catboost import CatBoostClassifier
import joblib

# Load datasets
train = pd.read_csv('train.csv')  # Update path if needed
test = pd.read_csv('test.csv')    # Update path if needed

# Check for missing values in the target column
print(f"Missing values in loan_status: {train['loan_status'].isnull().sum()}")

# Drop rows where target (loan_status) is missing
train = train.dropna(subset=['loan_status'])

# Separate features and target
X = train.drop(columns=['loan_status', 'id'])  # Drop 'id' and 'loan_status'
y = train['loan_status']

# Identify categorical and numerical columns
categorical_cols = ['person_home_ownership', 'loan_intent', 'loan_grade', 'cb_person_default_on_file']
numerical_cols = [col for col in X.columns if col not in categorical_cols]

# Preprocessing pipelines for both numeric and categorical data
numerical_transformer = SimpleImputer(strategy='mean')  # Impute missing values in numeric columns
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),  # Impute missing categorical data
    ('onehot', OneHotEncoder(handle_unknown='ignore'))     # One-hot encode categorical variables
])

# Combine the preprocessing steps
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])

# Create a pipeline with preprocessing and a classifier
model_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', CatBoostClassifier(verbose=0))  # Suppress CatBoost verbose output
])

# Split into train and validation sets
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model_pipeline.fit(X_train, y_train)

# Save the model to a file
joblib.dump(model_pipeline, 'loan_model.pkl')
print("Model saved as loan_model.pkl")
