# Generated by Django 4.2.3 on 2023-09-18 14:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdata',
            old_name='name',
            new_name='username',
        ),
    ]
