export const fetchTasksFromServer = async () => {
  try {
    const response = await fetch("https://rnonobbdc7.execute-api.us-east-1.amazonaws.com/new-stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: 'fetchTasks' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.body?.tasks || [];
  } catch (error) {
    console.error("Error fetching tasks from server:", error);
  }
};

export const fetchEpicsFromServer = async () => {
  try {
    const response = await fetch("https://rnonobbdc7.execute-api.us-east-1.amazonaws.com/new-stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: 'fetchEpics' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.body?.epics || [];
  } catch (error) {
    console.error("Error fetching epics from server:", error);
  }
};

export const saveTasksToServer = async (tasksData) => {
  try {
    const response = await fetch("https://rnonobbdc7.execute-api.us-east-1.amazonaws.com/new-stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasksData, action: 'insertTask' })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.body?.task || [];
  } catch (error) {
    console.error("Error saving tasks to server:", error);
  }
};

export const saveEpicsToServer = async (epicData) => {
  try {
    const response = await fetch("https://rnonobbdc7.execute-api.us-east-1.amazonaws.com/new-stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ epicData, action: 'insertEpic' })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.body?.epic || [];
  } catch (error) {
    console.error("Error saving epic to server:", error);
  }
};

export const updateTaskToOnServer = async (tasksData) => {
  try {
    const response = await fetch("https://rnonobbdc7.execute-api.us-east-1.amazonaws.com/new-stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasksData, action: 'updateTask' })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.body?.task || [];
  } catch (error) {
    console.error("Error saving tasks to server:", error);
  }
};

export const removeTaskToOnServer = async (tasksData) => {
  try {
    const response = await fetch("https://rnonobbdc7.execute-api.us-east-1.amazonaws.com/new-stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasksData, action: 'deleteTask' })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.body?.deleted;
  } catch (error) {
    console.error("Error saving tasks to server:", error);
  }
};

export const removeEpicFromServer = async (epicData) => {
  try {
    const response = await fetch("https://rnonobbdc7.execute-api.us-east-1.amazonaws.com/new-stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ epicData, action: 'deleteEpic' })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.body?.deleted;
  } catch (error) {
    console.error("Error saving tasks to server:", error);
  }
};