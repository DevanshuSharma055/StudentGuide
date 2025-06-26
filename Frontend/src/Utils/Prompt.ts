export const Prompt = (answers: any) => {
  const extracurriculars = Array.isArray(answers["22"])
    ? answers["22"].join(", ")
    : answers["22"] || "Not specified";

  const enrolledStatus =
    typeof answers["8"] === "string"
      ? answers["8"].toLowerCase() === "no"
        ? "not enrolled in any course"
        : "enrolled in " + answers["8"]
      : "Enrollment info not available";

  const searchText = `
The user is ${answers["1"]}, a ${answers["2"]}-year-old from ${
    answers["4"]
  }, identifying as ${answers["3"]}. 
They are currently a ${answers["5"]}, and their highest qualification is ${
    answers["6"]
  }, with a focus on ${answers["7"]}.

They enjoy subjects like ${answers["9"]} and are strong in ${
    answers["10"]
  }. Currently, they are ${enrolledStatus}.
Their primary career goal is ${answers["11"]}, and they prefer ${
    answers["12"]
  } work.

They are ${
    answers["16"] === "Yes"
      ? "comfortable"
      : answers["16"] === "No"
      ? "uncomfortable"
      : "somewhat comfortable"
  } with technical tasks like coding. They ${
    answers["19"] === "Yes"
      ? "are"
      : answers["19"] === "No"
      ? "are not"
      : "might be"
  } open to competitive exams. Their financial capacity for education is ${
    answers["20"]
  }, and their family is ${answers["21"]} supportive of career risks.

They are ${
    answers["14"] === "Yes"
      ? "open"
      : answers["14"] === "No"
      ? "not open"
      : "somewhat open"
  } to relocation. They value ${answers["15"]}, and are ${
    answers["27"]
  } by nature. They prefer working in a ${
    answers["26"]
  } setting and handle pressure as follows: "${answers["28"]}".

They are involved in extracurriculars like ${extracurriculars}, and treat them as a ${
    answers["23"]
  }. They ${answers["24"] === "Yes" ? "have" : "have not"} won awards, and ${
    answers["25"] === "Yes"
      ? "want"
      : answers["25"] === "No"
      ? "do not want"
      : "might consider"
  } to pursue a career in those fields.

They also enjoy ${
    Array.isArray(answers["29"]) ? answers["29"].join(", ") : answers["29"]
  }.

Based on this detailed profile, suggest the **top 7 to 10 career options** that align well with their interests, strengths, values, and limitations.

For each option, provide:
- **Career Name**
- **Brief Description**
- **Why it fits this user**
- **Required Education/Exams**
- **Estimated Cost**
- **Work Nature** (desk/field/remote/creative)
- **Career Growth Potential**
- **Alternative Paths** (if applicable)

Please strictly follow this format for each career:
**1. Career Name:** ...
* **Brief Description:** ...
* **Why it fits [name]:** ...
* **Required Education/Exams:** ...
* **Estimated Cost:** ...
* **Work Nature:** ...
* **Career Growth Potential:** ...
* **Alternative Paths:** ...
`;

return searchText
};
