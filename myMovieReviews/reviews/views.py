from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import MovieReview
from .forms import MovieReviewForm

# Create your views here.

# 1. 리뷰 리스트 페이지 (메인 페이지)
def review_list(request):
    """모든 영화 리뷰 목록을 보여주는 뷰"""
    reviews = MovieReview.objects.all().order_by('-created_at')
    return render(request, 'reviews/review_list.html', {
        'reviews': reviews
    })

# 2. 리뷰 상세 페이지
def review_detail(request, pk):
    """특정 영화 리뷰의 상세 내용을 보여주는 뷰"""
    review = get_object_or_404(MovieReview, pk=pk)
    return render(request, 'reviews/review_detail.html', {
        'review': review
    })

# 3. 리뷰 작성 페이지
def review_create(request):
    """새로운 영화 리뷰를 작성하는 뷰"""
    if request.method == 'POST':
        form = MovieReviewForm(request.POST)
        if form.is_valid():
            review = form.save()
            return redirect('reviews:review_detail', pk=review.pk)
    else:
        form = MovieReviewForm()
    
    return render(request, 'reviews/review_form.html', {
        'form': form,
        'title': '새 리뷰 작성'
    })

# 4. 리뷰 수정 페이지
def review_edit(request, pk):
    """기존 영화 리뷰를 수정하는 뷰"""
    review = get_object_or_404(MovieReview, pk=pk)
    
    if request.method == 'POST':
        form = MovieReviewForm(request.POST, instance=review)
        if form.is_valid():
            review = form.save()
            return redirect('reviews:review_detail', pk=review.pk)
    else:
        form = MovieReviewForm(instance=review)
    
    return render(request, 'reviews/review_form.html', {
        'form': form,
        'title': '리뷰 수정'
    })

# 5. 리뷰 삭제
def review_delete(request, pk):
    """영화 리뷰를 삭제하는 뷰"""
    review = get_object_or_404(MovieReview, pk=pk)
    
    if request.method == 'POST':
        review.delete()
        return redirect('reviews:review_list')
    
    return render(request, 'reviews/review_confirm_delete.html', {
        'review': review
    })
