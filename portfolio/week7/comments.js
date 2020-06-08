 let commentList = [];
 if (localStorage.getItem("commentList")){
     commentList = JSON.parse(localStorage.getItem("commentList"));
 }

 export default class Comments {
    constructor(elementId) {
      this.selectedList = "";
      this.parent = document.getElementById(elementId);
      this.form = this.buildform();
    }
    displayForm() {
      this.parent.appendChild(this.form);
    }
    // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
    getAllComments() {
      return commentList;
    }
    // For the first stretch we will need to get just one hike.
    getCommentsByHike(hikeName) {
      return this.getAllComments().find(hike => hike.name === hikeName);
    }
    //show a list of hikes in the parentElement
    showCommentList() {
        renderComments(this.parent, this.getAllComments());
    }
    // show one hike with full details in the parentElement
    showOneHikeComments() {
      renderComments(this.parent, this.getAllComments().filter(i => i.name == this.selectedHike));
      this.parent.appendChild(this.form);
    }
    // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
  
    buildform() {
        const form = document.createElement("div");
        let commentSection = document.createElement("textarea");
        commentSection.id = "commentSection";
        form.appendChild(commentSection)
        const submitButton = document.createElement("button")
        submitButton.addEventListener("click", () => {
          if (commentSection.value != ""){
              var today = new Date();
              var dd = (today.getDate());
              var mm = (today.getMonth());
              var yyyy = today.getFullYear();
              today = mm + 1 + '/' + dd + '/' + yyyy;
              var name = new String(this.selectedHike);
              commentList.push({name: this.selectedHike, date: today, comment: commentSection.value});
              commentList.sort((a, b) => {
                if (a.name > b.name){
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              })
              localStorage.setItem("commentList", JSON.stringify(commentList));
              renderComments(this.parent, this.getAllComments().filter(i => i.name == this.selectedHike));
              this.parent.appendChild(this.form);
              commentSection.value = "";
          }           
        });
        submitButton.innerHTML = "SUBMIT";
        form.appendChild(submitButton);
        return form;
    }
  }
  // methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
  function renderComments(parent, comments) {
    parent.innerHTML = "";
    comments.forEach(comment => {
        let newComment = document.createElement("div");
        newComment = renderOneHikeCommentList(comment);
        parent.appendChild(newComment);
    });
  }
  function renderOneHikeCommentList(comments) {
    const item = document.createElement("div");
    item.innerHTML = `
    <p>${comments.name}</p>
    <p>${comments.date}</p>
    <p>${comments.comment}</p>`;
    return item;
  }