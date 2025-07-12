from django.db import models

# Create your models here.

class MovieReview(models.Model):
    # 영화 제목 (필수 필드)
    title = models.CharField(max_length=200, verbose_name='영화 제목')
    
    # 감독
    director = models.CharField(max_length=100, verbose_name='감독')
    
    # 주연 배우들
    cast = models.CharField(max_length=200, verbose_name='주연')
    
    # 장르
    genre = models.CharField(max_length=100, verbose_name='장르')
    
    # 별점 (1-5점)
    rating = models.IntegerField(
        choices=[
            (1, '1점'),
            (2, '2점'),
            (3, '3점'),
            (4, '4점'),
            (5, '5점'),
        ],
        verbose_name='별점'
    )
    
    # 러닝타임 (분 단위)
    running_time = models.IntegerField(verbose_name='러닝타임(분)')
    
    # 개봉 년도
    release_year = models.IntegerField(verbose_name='개봉 년도')
    
    # 리뷰 내용
    content = models.TextField(verbose_name='리뷰 내용')
    
    # 작성일 (자동 생성)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='작성일')
    
    # 수정일 (자동 업데이트)
    updated_at = models.DateTimeField(auto_now=True, verbose_name='수정일')
    
    class Meta:
        verbose_name = '영화 리뷰'
        verbose_name_plural = '영화 리뷰들'
        ordering = ['-created_at']  # 최신 작성순으로 정렬
    
    def __str__(self):
        return f"{self.title} ({self.release_year}) - {self.rating}점"
