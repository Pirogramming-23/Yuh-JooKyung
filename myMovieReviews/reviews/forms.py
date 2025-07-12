from django import forms
from .models import MovieReview

class MovieReviewForm(forms.ModelForm):
    """영화 리뷰 작성을 위한 폼"""
    
    class Meta:
        model = MovieReview
        fields = [
            'title', 'director', 'cast', 'genre', 
            'rating', 'running_time', 'release_year', 'content'
        ]
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '영화 제목을 입력하세요'
            }),
            'director': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '감독을 입력하세요'
            }),
            'cast': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '주연 배우들을 입력하세요'
            }),
            'genre': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '장르를 입력하세요 (예: 액션, 드라마, 코미디)'
            }),
            'rating': forms.Select(attrs={
                'class': 'form-control'
            }),
            'running_time': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': '러닝타임(분)을 입력하세요',
                'min': '1'
            }),
            'release_year': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': '개봉 년도를 입력하세요',
                'min': '1900',
                'max': '2030'
            }),
            'content': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': '10',
                'placeholder': '영화에 대한 리뷰를 작성해주세요'
            })
        }
        labels = {
            'title': '영화 제목',
            'director': '감독',
            'cast': '주연',
            'genre': '장르',
            'rating': '별점',
            'running_time': '러닝타임(분)',
            'release_year': '개봉 년도',
            'content': '리뷰 내용'
        }
        help_texts = {
            'title': '영화의 제목을 정확히 입력해주세요.',
            'director': '영화의 감독을 입력해주세요.',
            'cast': '주요 배우들을 쉼표로 구분하여 입력해주세요.',
            'genre': '영화의 장르를 입력해주세요.',
            'rating': '1점부터 5점까지 평가해주세요.',
            'running_time': '영화의 상영 시간을 분 단위로 입력해주세요.',
            'release_year': '영화가 개봉한 년도를 입력해주세요.',
            'content': '영화에 대한 솔직한 리뷰를 작성해주세요.'
        }
    
    def clean_release_year(self):
        """개봉 년도 유효성 검사"""
        release_year = self.cleaned_data.get('release_year')
        if release_year < 1900 or release_year > 2030:
            raise forms.ValidationError('개봉 년도는 1900년부터 2030년 사이여야 합니다.')
        return release_year
    
    def clean_running_time(self):
        """러닝타임 유효성 검사"""
        running_time = self.cleaned_data.get('running_time')
        if running_time <= 0:
            raise forms.ValidationError('러닝타임은 1분 이상이어야 합니다.')
        return running_time 