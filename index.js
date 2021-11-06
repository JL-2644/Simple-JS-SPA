const fetchData = async () => {
  const email = document.getElementById("email").value;
  const secret = document.getElementById("secret").value;

  try {
    const response = await fetch(
      `https://tweakplan.com/JavaScriptDemoSubmission-1.0/candidates?email=${email}&secret=${secret}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const submit = async () => {
  const data = await fetchData();
  const url = document.getElementById("repo").value;

  if (data && url) {
    fetch(
      `https://tweakplan.com/JavaScriptDemoSubmission-1.0/candidates/${data.id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoURL: url,
          secret: data.secret,
        }),
      }
    ).then((response) => {
      response.text().then((data) => {
        const text = document.getElementById("registerResult");
        text.innerHTML = "Successfully Updated";
      });
    });
  } else {
    const text = document.getElementById("registerResult");
    text.innerHTML = "Please fill in all fields";
  }
};

const confirm = async () => {
  const data = await fetchData();

  if (data) {
    const text = document.getElementById("registerResult");
    text.innerHTML = "This is a valid user";
  } else {
    const text = document.getElementById("registerResult");
    text.innerHTML = "This is not a valid user";
  }
};
