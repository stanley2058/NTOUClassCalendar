// @ts-nocheck
const spinner = document.querySelector(".spinner");
const accountInp = document.getElementById("account");
const passwordInp = document.getElementById("password");
const table = document.querySelector(".table");
const forceFetchBtn = document.getElementById("forceFetchData");
const accordionBtn = document.getElementById("accordionBtn");

const getData = async (autoFetch = true) => {
  spinner.hidden = false;
  const account = accountInp.value;

  if (!account) {
    alert("請輸入學號。");
    spinner.hidden = true;
    return;
  }

  const res = await fetch(`http://localhost:3000/calendar?account=${account}`);
  const record = await res.json();
  if (!record) {
    spinner.hidden = true;
    if (!autoFetch) return;
    await forceFetch();
    forceFetchBtn.hidden = true;
    return;
  }
  table.innerHTML = record.calendar.replace(/<a[^>]*>|<\/a>/g, "");
  localStorage.setItem("account", account);
  forceFetchBtn.hidden = false;
  spinner.hidden = true;

  if (table.innerHTML && accordionBtn.ariaExpanded === "true")
    accordionBtn.click();
};

const forceFetch = async () => {
  spinner.hidden = false;
  const account = accountInp.value;
  const password = passwordInp.value;

  if (!account || !password) {
    alert("請輸入學號及密碼。");
    spinner.hidden = true;
    return;
  }

  const res = await fetch("http://localhost:3000/fetchCalendar", {
    method: "POST",
    body: JSON.stringify({
      account,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const record = await res.json();
  if (!record) {
    alert("發生非預期錯誤。");
    spinner.hidden = true;
    return;
  }

  table.innerHTML = record.calendar.replace(/<a[^>]*>|<\/a>/g, "");
  localStorage.setItem("account", account);
  spinner.hidden = true;

  if (table.innerHTML && accordionBtn.ariaExpanded === "true")
    accordionBtn.click();
};

const load = async () => {
  document.getElementById("fetchData").onclick = getData;
  document.getElementById("forceFetchData").onclick = forceFetch;
  accountInp.value = localStorage.getItem("account");
  if (accountInp.value) await getData(false);
  if (!table.innerHTML && accordionBtn.ariaExpanded === "false")
    accordionBtn.click();
};

load();
