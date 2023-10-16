# Generated by Django 4.2.3 on 2023-09-20 13:38

import data.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0004_alter_audiodata_tag_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_id', models.CharField(max_length=255)),
                ('block_id', models.IntegerField()),
                ('text', models.TextField()),
                ('completed', models.BooleanField(default=False)),
                ('file', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TaskMetaData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_id', models.CharField(max_length=255, unique=True)),
                ('user', models.CharField(max_length=255)),
                ('tag_id', models.CharField(max_length=255)),
                ('uploadTime', models.DateTimeField()),
                ('privacy', models.BooleanField()),
                ('completed', models.BooleanField(default=False)),
            ],
            managers=[
                ('objects', data.models.TaskManager()),
            ],
        ),
        migrations.DeleteModel(
            name='AudioData',
        ),
    ]