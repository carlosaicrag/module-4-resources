
document.querySelector('.post-list').addEventListener('click', async (e) => {
  e.preventDefault();
  console.log(e.target);
  console.log(e.target.parentElement);
  if (e.target.classList.contains('delete-button')) {
    const id = e.target.dataset.userId;
    console.log(id);
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    })
    const data = await res.json();
    if (res.ok) {
      const listItem = e.target.parentElement;
      listItem.innerHTML = "[User was banned for this pun]"
      listItem.style.color = "red";
      listItem.style.marginTop = "30px";
      setTimeout(() => {
        listItem.remove()
      }, 5000);
    } else {
      console.log('something went wrong');
    }
  }
})