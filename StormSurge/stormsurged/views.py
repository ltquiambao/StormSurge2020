from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return render(request,'maxelev/home.html')

def about(request):
    return HttpResponse('<h1>Storm Surge About</h1>')