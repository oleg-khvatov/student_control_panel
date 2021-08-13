(() => {
  const students = [
    {name: "Олег", surname: "Хватов", middleName: "Владимирович", dateOfBirth: new Date('1978-01-30'), startOfTraining: new Date('2000-06-26'), faculty: "Физико-математический"},
    {name: "Иван", surname: "Иванов", middleName: "Иванович", dateOfBirth: new Date('1995-06-26'), startOfTraining: new Date('2000-06-26'), faculty: "Экономический"},
    {name: "Петр", surname: "Петров", middleName: "Петрович", dateOfBirth: new Date('1996-06-26'), startOfTraining: new Date('2001-06-26'), faculty: "Социальный"},
    {name: "Семен", surname: "Семенов", middleName: "Семенович", dateOfBirth: new Date('1997-06-26'), startOfTraining: new Date('2002-06-26'), faculty: "Лингвистический"},
    {name: "Дмитрий", surname: "Дмитриев", middleName: "Дмитриевич", dateOfBirth: new Date('1998-06-26'), startOfTraining: new Date('2003-06-26'), faculty: "Механический"},
    {name: "Василий", surname: "Васильев", middleName: "Васильевич", dateOfBirth: new Date('1999-06-26'), startOfTraining: new Date('2004-06-26'), faculty: "Экологический"},
    {name: "Виктория", surname: "Петрова", middleName: "Владиленовна", dateOfBirth: new Date('2000-04-16'), startOfTraining: new Date('2017-04-16'), faculty: "Педагогический"},
    {name: "Марина", surname: "Плискина", middleName: "Романовна", dateOfBirth: new Date('1998-06-26'), startOfTraining: new Date('2016-01-30'), faculty: "Авиационный"},
    {name: "Алексей", surname: "Кириллов", middleName: "Христофорович", dateOfBirth: new Date('2000-11-04'), startOfTraining: new Date('2018-09-01'), faculty: "Механический"},
  ];

  const $body = document.body;
  const $container = document.createElement('div');
  const $h1 = document.createElement('h1');
  const $div = document.createElement('div'); //блок для вывода текста ошибки
  const $table = document.createElement('table');
  const $thead = document.createElement('thead');
  const $tbody = document.createElement('tbody');
  const $tr = document.createElement('tr');
  const STORAGE_KEY = '$$__KHVATOV_STUDENTS_APP_$$';

  const dataForm1 = [
    {id: 'input1', placeholder: 'Имя*', name: 'name'},
    {id: 'input2', placeholder: 'Фамилия*', name: 'surname'},
    {id: 'input3', placeholder: 'Отчество*', name: 'middleName'},
    {id: 'input4', type: 'date', name: 'dateOfBirth'},
    {id: 'input5', type: 'date', name: 'startOfTraining'},
    {id: 'input6', placeholder: 'Факультет*', name: 'faculty'},
  ];
  
  const dataForm2 = [
    {id: 'filter1', placeholder: 'Фамилия Имя Отчество'},
    {id: 'filter2', placeholder: 'Факультет'},
    {id: 'filter3', type: 'date'},
    {id: 'filter4', type: 'date'},
  ];

  const dataTableHead = ['Фамилия Имя Отчество', 'Факультет', 'Дата Рождения', 'Годы Обучения'];
  let filterArr =[];
  let sortArr = [];
 
  $body.classList.add('bg-light', 'font-italic');
  $container.classList.add('container');
  $h1.classList.add('text-center', 'mb-4');
  $h1.textContent = 'Список студентов МГТУ';
  $body.append($container);
  $container.append($h1);

  createTitle_h2('Добавление нового студента:');
  createForm(dataForm1, 1);
  createTitle_h2('Фильтры:');
  createForm(dataForm2);
  createTableHead();
  
  const $doneButton = document.querySelector('.btn-success');
  const $filterFields = document.getElementById('filter');
  const $sortField = document.getElementById('sort');

  let dataFromLs = JSON.parse(localStorage.getItem(STORAGE_KEY));//забираем из localStorage все, что есть
  if (dataFromLs === null) {
    dataFromLs = students;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataFromLs));
  }
  
  createTableBody(dataFromLs); //отрисовка таблицы из дефолтного массива (в данном случае)

  $doneButton.addEventListener('click', formValidate); //при клике на кнопку проводим валидацию полей формы




  
  //создание Заголовка
  function createTitle_h2(text) {
    const $h2 = document.createElement('h2');
    $h2.classList.add('text-left', 'mb-4');
    $h2.textContent = text;
    $container.append($h2);
  }
  
  //создание Формы
  function createForm(data, btnDone) {
    const $form = document.createElement('form');
    $form.classList.add('d-flex', 'justify-content-between','border', 'border-dark', 'p-1', 'mb-4');
    const $inputBlock = document.createElement('div');
    $inputBlock.classList.add('d-flex', 'justify-content-around', 'flex-wrap');
    $container.append($form);
    $form.append($inputBlock);
    for (let i = 0; i < data.length; ++i) {
      $input = document.createElement('input');
      $input.classList.add('formcontrol');
      $input.style.cssText =`width: 32%; margin: 5px;`;
      $inputBlock.append($input);

      for (let arr of Object.entries(data[i])) {
        $input.setAttribute(arr[0], arr[1]);
      }
    }

    if (btnDone) {
      const $button = document.createElement('button');
      $button.setAttribute('type', 'button');
      $button.classList.add('btn', 'btn-success');
      $form.classList.add('firstform');
      $form.style.cssText = `position: relative;`;
      $button.textContent = 'Добавить';
      $form.append($button);
    } else {
      $form.id = 'filter';
      $inputBlock.style.width = '100%';
      $inputBlock.classList.add('flex-nowrap');
    }
  }

  //валидация Формы
  function formValidate() {
    let student = {};
    for (i = 1; i <= 6; ++i) {
      let $input = document.getElementById('input' + i);
      let value = $input.value.trim();
      
      if (value) { 
        if ((i === 4) && (new Date(value).getFullYear() < 1900)) {
          error('Столько не живут! Проверьте год рождения!');
          return;
        }

        if ((i === 5) && (new Date(value).getFullYear() < 2000)) {
          error('Вы еще учитесь? Проверьте год поступления!');
          return;
        }
        
        ($input.type === 'date') ? student[$input.name] = new Date(value) : student[$input.name] = value;
      } else {
        switch (i) {
          case 1:
            error('Введите корректное имя!');
            return;
          case 2:
            error('Введите корректную фамилию');
            return;
          case 3:
            error('Введите корректное отчество');
            return;
          case 4:
            error('Введите год рождения');
            return;
          case 5:
            error('Введите год начала обучения');
            return;
          case 6:
            error('Введите факультет');
            return;
        }
      }
    }
    dataFromLs.push(student);
    $div.remove(); //удаление элемента "ошибки"
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataFromLs));
    document.querySelector('.firstform').reset();
    createTableBody(dataFromLs);
    return;
  }

  //вывод текста ошибки
  function error(text) {
    $div.style.cssText = `
    position: absolute; 
    top: -75%; 
    right: 0; 
    width: max-content; 
    padding: 5px 10px; 
    color: red; 
    font-weight: 600; 
    font-size: 24px; 
    line-height: 40px; 
    border: 2px solid red; 
    `;
    $div.textContent = text;
    document.querySelector('.firstform').append($div);
    return;
  }
  
  //голова Таблицы
  function createTableHead() {
    let k = 0;
    $table.classList.add('table', 'table-bordered', 'table-hover');
    $container.append($table);
    $thead.classList.add('thead-light');
    $thead.id = 'sort';
    $thead.style.cssText = 'text-align: center;';
    $table.append($thead);
    $thead.append($tr);
    
    for (let field of dataTableHead) {
      const $th = document.createElement('th');
      const $thBtn = document.createElement('button');
      $th.style.cssText = 'padding: 0.45rem;';
      $thBtn.id = 'sort' + k;
      $thBtn.textContent = field;
      $thBtn.classList.add('btn', 'btn-outline-dark', 'btn-block');
      $thBtn.style.cssText = 'font-style: italic; font-weight: 700;';
      $tr.append($th);
      $th.append($thBtn);
      k += 1;
    }
    return;
  }

  //тело таблицы (отрисовка строк)
  function createTableBody(arr) {
    $tbody.innerHTML = ''; //замена вложенных тэгов текстовой строкой (Данный вариант расходует меньше памяти, чем делать, например, цикл по удалению элементов)
    $table.append($tbody);
    
    arr.map(obj => {
      // тут возвращаем изменённый элемент (object данных каждого студента)
      const studentObj = {}; //формируемый объект для отрисовки строки таблицы
      studentObj.name = `${obj.surname.trim()} ${obj.name.trim()} ${obj.middleName.trim()}`;
      studentObj.faculty = `${obj.faculty.trim()}`;
      const age = ((new Date().getTime() - new Date(obj.dateOfBirth).getTime()) / (24 * 3600 * 365.25 * 1000)) | 0; //вычисление возраста студента
      const startYear = new Date(obj.startOfTraining).getFullYear();
      const endYear = startYear + 4;
      let course = `(${new Date().getFullYear() - startYear + 1} курс)`;
      if ((endYear < new Date().getFullYear()) || ((endYear === new Date().getFullYear()) && ((new Date().getMonth() + 1) > 6))) {
        course = 'закончил(а)';
      }
       
      studentObj.dateOfBirth = `${new Date(obj.dateOfBirth).getDate()}.${new Date(obj.dateOfBirth).getMonth() + 1}.${new Date(obj.dateOfBirth).getFullYear()} (${age})`;
      studentObj.yearsOfStudy = `${startYear}-${endYear} ${course}`;
      return studentObj;
    }).forEach(studentObj => {
      // а тут уже отрисовываем
      const $tr = document.createElement('tr');
      $tbody.append($tr);
      Object.values(studentObj).forEach(value => {
        const $td = document.createElement('td');
        $td.textContent = value.trim();
        $tr.append($td);
      });
    });
    return;
  }

    //-----------------подготовка к фильтрации-------------------------
    const filterData = {filter1: '', filter2: '', filter3: '', filter4: ''}; //объект ключей (полей) и значений фильтров для последущей фильтрации
    const filterKeys = Object.keys(filterData);
    
  
    $filterFields.addEventListener('input', (event) => {
      const id = event.target.id;
      let filterValue = event.target.value.trim();
      
      filterKeys.forEach((key) => {
        if (key === id) {
          filterData[key] = filterValue;
        }
      })
      
      createTableBody(filter(dataFromLs, filterData));//отрисовка отфильтрованной таблицы
      // console.log(filterData);
    });
    
    
    // фильтрация элементов массива
    function filter(array, inputValue) {
      Object.keys(inputValue).forEach((field) => {
        if (!inputValue[field]) {
          filterArr = [];
          createTableBody(array);
          return;
        }
       
        switch (field) {
          case 'filter1':
            filterArr = array.filter((obj) => ((obj.name.includes(inputValue[field])) || (obj.surname.includes(inputValue[field])) || (obj.middleName.includes(inputValue[field]))));
            break;
            
          case 'filter2':
            filterArr = array.filter((obj) => obj.faculty.includes(inputValue[field]));
            break;
  
          case 'filter3':
            filterArr = array.filter((obj) => obj.dateOfBirth.includes(inputValue[field]));
            break;
  
          case 'filter4':
            filterArr = array.filter((obj) => obj.startOfTraining.includes(String(new Date(inputValue[field]).getFullYear())));
            break;
        }
  
        array = filterArr;
      })
      return array;
    }
    
  
  
    //---------------------сортировка-----------------------------
    
    $sortField.addEventListener('click', (elem) => {
      const id = elem.target.id;
  
      switch (id) {
        case 'sort0':
          sortArr = sort(filter(dataFromLs, filterData), 'surname');
          break;
  
        case 'sort1':
          sortArr = sort(filter(dataFromLs, filterData), 'faculty');
          break;
  
        case 'sort2':
          sortArr = sort(filter(dataFromLs, filterData), 'dateOfBirth');
          break;
  
        case 'sort3':
          sortArr = sort(filter(dataFromLs, filterData), 'startOfTraining');
          break;
      }
      createTableBody(sortArr);
    })
    
  
  
  
    // функция сортировки элементов массива
    function sort (array, field) {
      return [...array].sort(function (a, b) {
        return ((a[field] > b[field]) ? 1 : -1);
      });
    }
    //----------------------------------------------------------------------------------------------

  
})();