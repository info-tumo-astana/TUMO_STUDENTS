document.addEventListener('DOMContentLoaded', () => {

  let students = [];

  fetch('students.json')
    .then(res => res.json())
    .then(data => students = data);

  function normalize(str) {
        if (!str) return '';
        return str.trim().toLowerCase();
}

  document.getElementById('searchBtn').addEventListener('click', () => {
    const name = normalize(document.getElementById('name').value);
    const birth = document.getElementById('birth').value;

    const resultDiv = document.getElementById('result');

    const student = students.find(s => {
  const fullNameWords = normalize(s.full_name).split(' ');
  const inputWords = name.split(' ');

  return inputWords.every(word =>
    fullNameWords.includes(word)
  ) && s.birth_date === birth;
});

    if (!student) {
      resultDiv.innerText = 'Учащийся не найден';
      return;
    }

    resultDiv.innerHTML = `
      Ваш Коуч: ${student.learning_coach}<br>
      Дни занятий: ${student.expo_date}<br>
      Время занятий: ${student.expo_time}
    `;
  });

});