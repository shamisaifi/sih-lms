from mongoengine import Document, StringField, EmailField, BooleanField, IntField, ReferenceField, ListField

# from .course import Course

class User(Document):
    name = StringField(required=True)
    email = EmailField(required=True)
    profilePicture = StringField()
    currentStreak = IntField(default=0)
    points = IntField(default=0)
    ongoingCourses = ListField(ReferenceField('Course'))
    completedCourses = ListField(ReferenceField('Course'))
