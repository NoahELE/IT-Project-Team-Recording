# Generated by Django 4.2.3 on 2023-09-19 13:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='audiodata',
            old_name='created_by_user',
            new_name='user',
        ),
    ]