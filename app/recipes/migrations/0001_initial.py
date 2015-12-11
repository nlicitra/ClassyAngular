# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import recipes.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=64)),
                ('ingredients', recipes.models.ListField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
