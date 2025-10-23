from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import json
from .utils import get_response

@csrf_exempt
def query_view(request):
    if request.method == "POST":

        data = ""
        data_field = request.POST.get('data')
        try:
            data = json.loads(data_field) if data_field else {}
            data = data["input"]
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON in "data" field'}, status=400)

        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        uploads_dir = os.path.join(project_root, 'uploads')
        os.makedirs(uploads_dir, exist_ok=True)

        files = []

        for key, file in request.FILES.items():

            file_path = os.path.join(uploads_dir, f"{key}{os.path.splitext(file.name)[1]}")

            files.append(file_path)

            with open(file_path, 'wb') as f:
                for chunk in file.chunks():
                    f.write(chunk)

        return JsonResponse({
            'reply': get_response(data, files),
            'received_data': data,
        })

    return JsonResponse({'error': 'Invalid request method'}, status=400)
