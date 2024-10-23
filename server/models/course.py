from mongoengine import Document, StringField, IntField, ListField, ReferenceField, CASCADE


class Course(Document):
    owner = ReferenceField('User', reverse_delete_rule=CASCADE)
    name = StringField(required=True)
    description = StringField()
    amount = IntField(default=0)
    thumbnail = StringField()
    videos = ListField(StringField())
    attachments = ListField(StringField())
    ratings = ListField(IntField())
