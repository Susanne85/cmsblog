const newCommentFormHandler = async (event) => {
  event.preventDefault();
  console.log('New-Comment JS');
  const post_comment = document.querySelector('#new-comment').value.trim();
  const blogId = document.querySelector('#blog-id').value.trim();
   
  if (post_comment) {
    const post_date = new Date();
    const response = await fetch(`/api/comment/newcomment/${blogId}`, {
      method: 'POST',
      body: JSON.stringify({ post_comment, post_date}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Comment could not be added');
    }
  } else {
    alert('Enter a comment');
  }
};

document.querySelector('.new-post-form').addEventListener('submit', newCommentFormHandler);