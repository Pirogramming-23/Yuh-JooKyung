from django.contrib import admin
from .models import MovieReview

# Register your models here.

@admin.register(MovieReview)
class MovieReviewAdmin(admin.ModelAdmin):
    # 관리자 목록 페이지에서 보여줄 필드들
    list_display = ['title', 'director', 'genre', 'rating', 'release_year', 'created_at']
    
    # 검색 가능한 필드들
    search_fields = ['title', 'director', 'cast', 'genre']
    
    # 필터링 가능한 필드들
    list_filter = ['rating', 'genre', 'release_year', 'created_at']
    
    # 정렬 기준
    ordering = ['-created_at']
    
    # 한 페이지에 보여줄 항목 수
    list_per_page = 20
    
    # 읽기 전용 필드들 (자동 생성되는 필드들)
    readonly_fields = ['created_at', 'updated_at']
    
    # 필드 그룹화 (상세 페이지에서)
    fieldsets = (
        ('기본 정보', {
            'fields': ('title', 'director', 'cast', 'genre', 'release_year')
        }),
        ('평가 정보', {
            'fields': ('rating', 'running_time')
        }),
        ('리뷰 내용', {
            'fields': ('content',)
        }),
        ('시간 정보', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)  # 접을 수 있는 섹션
        }),
    )
