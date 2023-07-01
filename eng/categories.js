export class Categories {
  constructor(categoriesConfig) {
    this.categoriesConfig = categoriesConfig;

    const params = new URLSearchParams(window.location.search);

    const category = params.get('category');
    const subCategory = params.get('sub-category');

    this.selectedCategory = category;
    this.selectedSubCategory = subCategory;
    this.wrap = document.createElement('div');
  }

  onCategorySelect(categoryId) {
    this.selectedCategory = categoryId;

    // var searchParams = new URLSearchParams(window.location.search);
    // searchParams.set('category', categoryId);
    // window.location.search = searchParams.toString();
  }

  renderSubCategories(subCategories) {
    //TODO: ref to createBackBtn
    const backBtn = document.createElement('button');
    backBtn.innerHTML = 'Back';
    backBtn.addEventListener('click', () => {
      this.renderCategories();
    });
    backBtn.className = 'btn btn-primary';
    this.wrap.innerHTML = '';

    this.wrap.appendChild(backBtn);
    subCategories.map((subCategory) => {
      const subCategoryWrap = document.createElement('div');
      subCategoryWrap.innerHTML = subCategory.title;

      subCategoryWrap.addEventListener('click', () => {
        fetch('/files/' + subCategory.contentFileName)
          .then((res) => res.text())
          .then(this.renderContent.bind(this, subCategories))
          .catch((e) => console.error(e));
      });

      this.wrap.appendChild(subCategoryWrap);
    });
  }

  renderContent(subCategories, content) {
    this.wrap.innerHTML = '';

    const md = document.createElement('div');
    md.innerHTML = marked.parse(content);
    this.wrap.appendChild(md);

    //TODO: ref to createBackBtn
    const backBtn = document.createElement('button');
    backBtn.innerHTML = 'Back';
    backBtn.addEventListener('click', () => {
      this.renderSubCategories(subCategories);
    });
    backBtn.className = 'btn btn-primary';

    this.wrap.appendChild(backBtn);
  }

  renderCategories() {
    this.wrap.innerHTML = '';
    this.categoriesConfig.map((category) => {
      const categoryWrap = document.createElement('div');
      categoryWrap.innerHTML = `
        <h2>${category.title}</h2>
      `;

      categoryWrap.addEventListener('click', () => {
        this.renderSubCategories(category.subCategories);
      });

      this.wrap.appendChild(categoryWrap);
    });
  }

  render() {
    this.renderCategories();

    return this.wrap;
  }
}
