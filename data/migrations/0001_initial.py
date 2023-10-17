# Generated by Django 4.2.3 on 2023-10-16 23:47

import data.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TaskData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_id', models.CharField(max_length=255)),
                ('block_id', models.IntegerField()),
                ('text', models.TextField(max_length=255)),
                ('completed', models.BooleanField(default=False)),
                ('file', models.CharField(max_length=255, unique=True)),
            ],
            managers=[
                ('objects', data.models.TaskManager()),
            ],
        ),
        migrations.CreateModel(
            name='TaskMetaData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_id', models.CharField(max_length=255, unique=True)),
                ('user', models.CharField(max_length=255)),
                ('tag_id', models.IntegerField()),
                ('upload_time', models.DateTimeField()),
                ('privacy', models.BooleanField(default=False)),
                ('completed', models.BooleanField(default=False)),
            ],
            managers=[
                ('objects', data.models.TaskManager()),
            ],
        ),
    ]
