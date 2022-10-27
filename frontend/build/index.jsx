import React from 'react';
import $ from 'jquery';

$('.price-filter-list').on('click', 'li', function() {
    $('.price-filter-list li.filter-active').removeClass('filter-active');
    $(this).addClass('filter-active');
});