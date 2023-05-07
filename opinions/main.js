const submitBtn = document.querySelector("#submit-btn");
const commentList = [];

submitBtn.addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const comment = document.querySelector("#comment").value;


  if (!name || !comment) {
    alert("Por favor, rellene todos los campos.");
    return;
  }

  const newComment = { name, comment };
  commentList.push(newComment);

  renderComments();


  document.querySelector("#name").value = "";
  document.querySelector("#comment").value = "";
});

function renderComments() {
  const commentContainer = document.querySelector("#comment-container");
  commentContainer.innerHTML = "";

  commentList.forEach((comment, index) => {
    if ((index + 1) % 2 === 0) {
      const div = document.createElement("div");
      div.classList.add("row-span-2", "p-6", "border", "border-gray-100", "rounded-xl", "bg-gray-50", "sm:p-8");

      const innerDiv = document.createElement("div");
      innerDiv.classList.add("h-full", "flex", "flex-col", "justify-center", "space-y-4");

      const text = document.createElement("p");
      text.classList.add("text-gray-600", "md:text-xl");
      text.innerHTML = `<span class="font-serif">&ldquo;</span>${comment.comment}<span class="font-serif">&rdquo;</span>`;

      const author = document.createElement("div");
      const authorName = document.createElement("h6");
      authorName.classList.add("text-lg", "font-semibold", "leading-none");
      authorName.textContent = comment.name;
      author.appendChild(authorName);

      innerDiv.appendChild(text);
      innerDiv.appendChild(author);
      div.appendChild(innerDiv);

      commentContainer.appendChild(div);
    } else {
      const div = document.createElement("div");
      div.classList.add("p-6", "border", "border-gray-100", "rounded-xl", "bg-gray-50", "sm:flex", "sm:space-x-8", "sm:p-8");

      const innerDiv = document.createElement("div");
      innerDiv.classList.add("space-y-4", "mt-4", "sm:mt-0", "sm:text-left");

      const text = document.createElement("p");
      text.classList.add("text-gray-600");
      text.innerHTML = `<span class="font-serif">&ldquo;</span>${comment.comment}<span class="font-serif">&rdquo;</span>`;

      const author = document.createElement("div");
      const authorName = document.createElement("h6");
      authorName.classList.add("text-lg", "font-semibold", "leading-none");
      authorName.textContent = comment.name;
      author.appendChild(authorName);

      innerDiv.appendChild(text);
      innerDiv.appendChild(author);
      div.appendChild(innerDiv);

      commentContainer.appendChild(div);
    }
  });
}