"""
Django settings for exocat project.

Generated by 'django-admin startproject' using Django 1.11.7.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# MEDIA
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')



# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'mw)1a)pwsxi=p!_gsmq*48v!*z!u(@&@-(y!$%dd&i^x=q!jwo'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

SETTINGS_PATH = os.path.dirname(os.path.dirname(__file__))

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.postgres',
    #'django.contrib.humanize',
    'exocatsite',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'exocat.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(SETTINGS_PATH, 'exocatsite/templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'exocat.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'es-es'

TIME_ZONE = 'UTC'

USE_I18N = True

# USE_L10N = True Deshabilitado porque mostraba las fechas en formato ingles

USE_TZ = True

DEFAULT_CHARSET = "utf-8"

# DATE_FORMAT = "d-m-Y"
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
# STATICFILES_DIRS = (
#   os.path.join(BASE_DIR, 'static/'),
# )
FILE_UPLOAD_PERMISSIONS = 0644 # Ojo si la version de python es >= 3 entonces es 0o644
FILE_UPLOAD_MAX_MEMORY_SIZE = 10485760

LOGIN_REDIRECT_URL = '/base_dades/'

# #GDAL (prueba)
#GDAL_LIBRARY_PATH = r'C:\OSGeo4\bin\gdal300.dll'
# if os.name == 'nt':
#     import platform
#     OSGEO4W = r"C:\OSGeo4W"
#     if '64' in platform.architecture()[0]:
#         OSGEO4W += "64"
#     assert os.path.isdir(OSGEO4W), "Directory does not exist: " + OSGEO4W
#     os.environ['OSGEO4W_ROOT'] = OSGEO4W
#     os.environ['GDAL_DATA'] = OSGEO4W + r"\share\gdal"
#     os.environ['PROJ_LIB'] = OSGEO4W + r"\share\proj"
#     os.environ['PATH'] = OSGEO4W + r"\bin;" + os.environ['PATH']

#Esto solo para produccion ya que en produccion se necesita un collectstatic:
# STATIC_ROOT = "c:\wsgi_app\gestprjsite\static"

from settings_local import *