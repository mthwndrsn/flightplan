let tasks = [];
let currentFilter = 'week';

function addTask() {
    const taskName = prompt("Enter task name:");
    const startDate = prompt("Enter start date (YYYY-MM-DD):");
    const endDate = prompt("Enter end date (YYYY-MM-DD):");

    if (taskName && startDate && endDate) {
        tasks.push({
            name: taskName,
            start: new Date(startDate),
            end: new Date(endDate),
            swimlane: 'default' // Placeholder swimlane
        });
        renderGanttChart();
    }
}

function renderGanttChart() {
    const chart = document.getElementById('ganttChart');
    chart.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        switch (currentFilter) {
            case 'week':
                return withinWeek(task.start);
            case 'month':
                return withinMonth(task.start);
            case 'quarter':
                return withinQuarter(task.start);
            default:
                return true;
        }
    });

    const lanes = {};

    filteredTasks.forEach(task => {
        if (!lanes[task.swimlane]) {
            lanes[task.swimlane] = [];
        }
        lanes[task.swimlane].push(task);
    });

    for (const [lane, tasks] of Object.entries(lanes)) {
        const laneDiv = document.createElement('div');
        laneDiv.classList.add('swimlane');

        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `<span>${task.name}</span><span>${task.start.toDateString()} - ${task.end.toDateString()}</span>`;
            laneDiv.appendChild(taskDiv);
        });

        chart.appendChild(laneDiv);
    }
}

function filterTasks() {
    currentFilter = document.getElementById('filter').value;
    renderGanttChart();
}

function withinWeek(date) {
    const now = new Date();
    const oneWeekAhead = new Date();
    oneWeekAhead.setDate(now.getDate() + 7);

    return date >= now && date <= oneWeekAhead;
}

function withinMonth(date) {
    const now = new Date();
    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(now.getMonth() + 1);

    return date >= now && date <= oneMonthAhead;
}

function withinQuarter(date) {
    const now = new Date();
    const threeMonthsAhead = new Date();
    threeMonthsAhead.setMonth(now.getMonth() + 3);

    return date >= now && date <= threeMonthsAhead;
}
