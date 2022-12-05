/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateData = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v2/users/updateMyPassword'
        : '/api/v2/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const addBookmark = async (tourId) => {
  const url = `/api/v2/tours/${tourId}/bookmark`;
  try {
    const res = await axios({
      method: 'PATCH',
      url,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Bookmarked tour successfully`);
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const addTourReview = async (tourId, rating, review) => {
  try {
    const url = `/api/v2/tours/${tourId}/reviews`;

    const res = await axios({
      method: 'POST',
      url,
      data: {
        rating,
        review,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Review added successfully`);
      window.setTimeout(() => {
        location.assign('/me-tours');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
