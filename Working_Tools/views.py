#! /usr/bin/env python3
#! --encoding:utf-8 --

from django.shortcuts import render,HttpResponse
import json,re

def index(request):
    return render(request,"index.html")


def hexToStr(request):

    return render(request,"hexToStr.html")

def hexToEnc(request,encoding):
    hex = request.POST.get('hex',None)
    res = {'status':True,'data':None,'error':None}
    try:
        if hex.count(r'\x'):
            res['data'] = bytes([int(i, 16) for i in hex.split(r'\x')[1:]]).decode(encoding)
        elif hex.count(' '):
            res['data'] = bytes([int(i, 16) for i in re.split(r'\s+',hex)[1:]]).decode(encoding)
        else:
            res['data'] = bytes([int(hex[i:i+2], 16) for i in range(0,len(hex),2)]).decode(encoding)
    except:
        res['status'] = False
        res['error'] = "无效的16进制码"

    return HttpResponse(json.dumps(res))


def encToHex(request,encoding):
    s = request.POST.get('s',None)
    res = {'status':True,'data':None,'error':None}

    try:
        res['data'] = re.search(r"b'(.+)'",s.encode(encoding).__str__()).group(1);print(res['data']);
    except Exception as e:
        res['status'] = False
        res['error'] = e.__repr__()

    return HttpResponse(json.dumps(res))



def workingSechdule(request):
    return render(request,"workingSchedule.html")

def t(request):
    return render(request,"t.html")

def t1(request):
    return render(request,"t1.html")

def t2(request):
    return render(request,"t2.html")