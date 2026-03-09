let globalIssuesData = [];

//For login page
const loginBtn = document.getElementById('loginBtn');
const homePage = document.getElementById('home-page');
const loginPage = document.getElementById('login-page');
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');
const demoDiv = document.getElementById('login-error');

//For home page
const search = document.getElementById('searchInput');
const btnCategoryAll = document.querySelector('.btn-category-all');
const btnCategoryOpen = document.querySelector('.btn-category-open');
const btnCategoryClosed = document.querySelector('.btn-category-closed');
const categoryBtn = document.querySelectorAll('.btn-category');
const totalIssues = document.getElementById('totalIssues');
const issuesContainer = document.getElementById('issuesContainer');
const openTag = document.getElementById('open-tag');
const closedTag = document.getElementById('closed-tag');
const modalBox = document.getElementById("modal-box");
const closeBtn = document.getElementById("closeBtn");
const loadingSpinner = document.getElementById('loading-spinner')

loginBtn.addEventListener('click', () => {
    const usernameValue = inputUsername.value.trim();
    const passwordValue = inputPassword.value.trim();

    if (usernameValue === 'admin' && passwordValue === 'admin123') {
        homePage.classList.remove('hidden');
        loginPage.classList.add('hidden');
    }
    else {
        demoDiv.classList.remove('hidden');
        inputUsername.value = '';
        inputPassword.value = '';
        return;
    }
});

//For Database
const urlAllIssues = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

const getSearchInfo = async () => {

    const searchValue = search.value.trim();
    if (searchValue !== '') {
        openTag.classList.remove('hidden');
        closedTag.classList.remove('hidden');
        removeActive();
        showSpinner();

        const urlSearchIssues = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
        const resp = await fetch(urlSearchIssues);
        const result = await resp.json();
        displayAllIssues(result.data);
    }

    hideSpinner();
}
const getBtnCategory = async (category) => {
    search.value = '';
    showSpinner();

    const resp = await fetch(urlAllIssues);
    const result = await resp.json();

    let filteredData = result.data;
    if (category !== 'all') {
        filteredData = result.data.filter(issue => issue.status === category);
    }
    removeActive();
    if (category === 'all') {
        openTag.classList.remove('hidden');
        closedTag.classList.remove('hidden');
        btnCategoryAll.classList.add('active');
    }
    if (category === 'open') {
        closedTag.classList.add('hidden');
        openTag.classList.remove('hidden');
        btnCategoryOpen.classList.add('active');
    }
    if (category === 'closed') {
        openTag.classList.add('hidden');
        closedTag.classList.remove('hidden');
        btnCategoryClosed.classList.add('active')
    };

    displayAllIssues(filteredData);
    hideSpinner();
}

const removeActive = () => {
    categoryBtn.forEach(btn => {
        btn.classList.remove('active')
    });
}

const createButtons = (labels) => {
    const labelConfigs = {
        "bug": { icon: "fa-bug", style: "bg-red-50 text-red-600 border" },
        "help wanted": { icon: "fa-life-ring", style: "bg-[#FFF6D1] text-[#F59E0B] border" },
        "enhancement": { icon: "fa-wand-magic-sparkles", style: "bg-green-50 text-green-600 border" },
        "good first issue": { icon: "fa-thumbs-up", style: "bg-blue-50 text-blue-600 border" },
        "documentation": { icon: "fa-book", style: "bg-[#EEEFF2] text-gray-500 border" }
    };

    return labels.map(label => {
        const config = labelConfigs[label.toLowerCase()] || { icon: "fa-tag", style: "bg-slate-50 text-slate-500 border-slate-200" };

        return `
      <button class="px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center justify-center text-center gap-1.5 uppercase tracking-wide ${config.style}">
        <i class="fa-solid ${config.icon}"></i>
        ${label}
      </button>`;
    }).join(' ');
}

const displayAllIssues = (issues) => {
    showSpinner()
    totalIssues.innerHTML = issues.length;
    issuesContainer.innerHTML = "";

    if (issues.length === 0) {
        issuesContainer.innerHTML = `
            <div class="col-span-4 w-full h-full p-6 sm:p-18 text-center rounded-xl space-y-6 ">
                <i class="text-6xl text-gray-500 fa-regular fa-face-frown"></i>
                <h1 class="font-bold font-bangla text-3xl text-gray-500">No Issue Found...!</h1>
            </div>
        `;
        hideSpinner();
        return;
    }

    issues.forEach(issue => {
        const localDate = new Date(issue.createdAt);
        const borderColor = issue.status === 'open' ? '[#00A96E]' : '[#A855F7]';

        let priorityClass = '';
        if (issue.priority === 'high') priorityClass = 'bg-[#FEECEC] text-[#EF4444]';
        else if (issue.priority === 'medium') priorityClass = 'bg-[#FFF6D1] text-[#F59E0B]';
        else priorityClass = 'bg-[#EEEFF2] text-[#9CA3AF]';

        const issueDiv = document.createElement('div');
        issueDiv.innerHTML = `
            <div onclick="openModal(${issue.id})" class="border-t-4 border-${borderColor} bg-white p-5 rounded-md shadow-sm hover:shadow-md duration-200 flex flex-col h-full cursor-pointer group transition-all">
                <div class="flex justify-between items-start mb-4">
                    <img src="assets/${issue.status}.png" alt="">
                    <button class="px-6 py-1 ${priorityClass} rounded-full uppercase text-sm">${issue.priority}</button>
                </div>
                <div class="space-y-2 flex-grow">
                    <h2 class="font-medium">${issue.title}</h2>
                    <p class="text-sm text-gray-500 line-clamp-3">${issue.description}</p>
                </div>
                <div class="mt-3 mb-4 flex flex-wrap gap-2">
                    ${createButtons(issue.labels)}
                </div>
                <div class="pt-4 w-full border-t border-gray-200 mt-auto flex flex-col gap-2.5 text-xs text-gray-500">
                    <p class="text-sm text-gray-500">#${issue.id} by ${issue.author}</p>
                    <p class="text-sm text-gray-500">${localDate.toLocaleDateString()}</p>
                </div>
           </div>                                                                                  
        `;
        issuesContainer.appendChild(issueDiv);
    });
    hideSpinner();

}

const openModal = (id) => {
    const issue = globalIssuesData.find(issue => issue.id === id);
    if (issue) displayModalInfo(issue);

    modalBox.classList.remove("hidden");
    modalBox.classList.add("flex");
}

const displayModalInfo = (issue) => {
    const localDate = new Date(issue.createdAt);
    const nameAuthor = issue.author;
    const assigneeName = issue.assignee;

    const borderColor = issue.status === 'open' ? '[#00A96E]' : '[#A855F7]';
    let priorityClass = '';
    if (issue.priority === 'high') priorityClass = 'bg-[#EF4444] text-[#FFFFFF]';
    else if (issue.priority === 'medium') priorityClass = 'bg-yellow-500 text-[#FFFFFF]';
    else priorityClass = 'bg-gray-600 text-[#FFFFFF]';

    modalBox.innerHTML = "";

    const issueDiv = document.createElement('div');
    issueDiv.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-[700px] space-y-6 ">
            <h2 class="text-xl font-bold mb-2">${issue.title}</h2>
            <div class="flex gap-2 justify-start items-center">
                <button class="px-2.5 py-1 bg-${borderColor} text-white rounded-full capitalize">${issue.status}</button>
                <i class="fa-solid fa-circle text-[5px] text-gray-500"> </i>
                <p class="text-sm text-gray-600 capitalize">Opened by ${nameAuthor.split('_').join(' ') ? nameAuthor.split('_').join(' ') : 'Author Not Found'}</p>
                <i class="fa-solid fa-circle text-[5px] text-gray-500"> </i>
                <p class="text-sm text-gray-600">${localDate.toLocaleDateString()}</p>
            </div>
            <div class="mt-3 mb-4 flex flex-wrap gap-2">
                    ${createButtons(issue.labels)}
            </div>
            <p class="mb-4 text-gray-600">${issue.description}</p>
            <div class="bg-gray-100 p-4 rounded-lg flex justify-between">
                <div>
                    <p class="text-gray-600">Assignee:</p>
                    <h2 class="text-gray-700 font-semibold capitalize">${assigneeName.split('_').join(' ') ? assigneeName.split('_').join(' ') : 'Not Assigned'}</h2>
                </div>
                <div>
                    <p class="text-gray-600">Priority:</p>
                    <button id="priorityBtn-${issue.priority}" class="px-3 py-1 ${priorityClass} rounded-full uppercase text-sm">${issue.priority}</button>
                </div>
                <div>

                </div>
            </div>
            <div class="flex justify-end">
                <button onclick="closeModalAction()" class="bg-[#4A00FF] font-semibold cursor-pointer text-white px-4 py-2 rounded-md">
                    Close
                </button>
            </div>
    </div>                                                                               
    `;
    modalBox.appendChild(issueDiv);
}

const closeModalAction = () => {
    modalBox.classList.add("hidden");
    modalBox.classList.remove("flex");
};

modalBox.addEventListener("click", (e) => {
    if (e.target === modalBox) {
        closeModalAction();
    }
});


const showSpinner = () => {
    loadingSpinner.classList.remove('hidden');
    issuesContainer.style.opacity = '0.3';
};
const hideSpinner = () => {
    loadingSpinner.classList.add('hidden');
    issuesContainer.style.opacity = '1';
};

const getDataFromDB = async () => {
    const resp = await fetch(urlAllIssues);
    const allIssues = await resp.json();
    globalIssuesData = allIssues.data;
    displayAllIssues(globalIssuesData);
}
getDataFromDB();