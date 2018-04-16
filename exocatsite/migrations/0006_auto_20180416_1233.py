# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-04-16 10:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exocatsite', '0005_auto_20180405_1455'),
    ]

    operations = [
        migrations.AddField(
            model_name='citacionsespecie',
            name='validat',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='citacionsespecie',
            name='contacte',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='citacionsespecie',
            name='idspinvasora',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
