export class Categories {
  constructor(categoriesConfig) {
    this.categoriesConfig = categoriesConfig;

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");
    const subCategory = params.get("sub-category");

    this.selectedCategory = category;
    this.selectedSubCategory = subCategory;
    this.wrap = document.createElement("div");
  }

  downloadPDF(markdownText, fileName) {
    // Convert Markdown to HTML
    var htmlContent = marked.parse(markdownText);

    // Create a new jsPDF instance
    var pdf = new jspdf.jsPDF();

    // Convert HTML to PDF
    pdf.html(htmlContent, {
      callback: function () {
        // Save the PDF file
        pdf.save(fileName);
      },
      windowWidth: 1920,
      x: 10,
      y: 10,
    });
  }

  onCategorySelect(categoryId) {
    this.selectedCategory = categoryId;

    // var searchParams = new URLSearchParams(window.location.search);
    // searchParams.set('category', categoryId);
    // window.location.search = searchParams.toString();
  }

  renderSubCategories(subCategories) {
    //TODO: ref to createBackBtn
    const backBtn = document.createElement("button");
    backBtn.innerHTML = "Back";
    backBtn.addEventListener("click", () => {
      this.renderCategories();
    });
    backBtn.className = "btn btn-primary mb-2";
    this.wrap.innerHTML = "";

    this.wrap.appendChild(backBtn);

    const contentWrap = document.createElement("div");
    contentWrap.className = "list-group";

    subCategories.map((subCategory) => {
      const subCategoryWrap = document.createElement("button");
      subCategoryWrap.className = "list-group-item list-group-item-action";
      subCategoryWrap.innerHTML = subCategory.title;
      subCategoryWrap.type = "button";

      subCategoryWrap.addEventListener("click", () => {
        fetch("./files/" + subCategory.contentFileName)
          .then((res) => res.text())
          .then(this.renderContent.bind(this, subCategories))
          .catch((e) => console.error(e));
      });

      contentWrap.appendChild(subCategoryWrap);
    });

    this.wrap.appendChild(contentWrap);
  }

  renderContent(subCategories, content) {
    this.wrap.innerHTML = "";

    //TODO: ref to createBackBtn
    const backBtn = document.createElement("button");
    backBtn.innerHTML = "Back";
    backBtn.addEventListener("click", () => {
      this.renderSubCategories(subCategories);
    });
    backBtn.className = "btn btn-primary mb-2";

    // const downloadPDFBtn = document.createElement('button');
    // downloadPDFBtn.innerHTML = 'Download PDF';
    // downloadPDFBtn.addEventListener('click', () => {
    //   this.downloadPDF(content, 'some.pdf');
    // });

    // downloadPDFBtn.className = 'btn btn-primary mb-2';
    // this.wrap.appendChild(downloadPDFBtn);

    this.wrap.appendChild(backBtn);

    const md = document.createElement("div");
    // const mdShadow = md.attachShadow({ mode: 'open' });
    md.innerHTML = marked.parse(content);
    this.wrap.appendChild(md);
  }

  renderCategories() {
    this.wrap.innerHTML = "";
    const categoryWrap = document.createElement("div");
    categoryWrap.className = "list-group";
    this.categoriesConfig.map((category) => {
      const categoryItem = document.createElement("button");
      categoryItem.className = "list-group-item list-group-item-action";
      categoryItem.innerHTML = category.title;
      categoryItem.type = "button";

      categoryItem.addEventListener("click", () => {
        this.renderSubCategories(category.subCategories);
      });
      categoryWrap.appendChild(categoryItem);
    });
    this.wrap.appendChild(categoryWrap);
  }

  render() {
    this.renderCategories();

    return this.wrap;
  }
}
