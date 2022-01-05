export let notes = [
  {
    icon: '<i class="fas fa-shopping-cart"></i>',
    name: "Shopping list",
    created: "1622781856881",
    category: "Task",
    content: "Tomatoes, bread, sugar",
    dates: "",
  },
  {
    icon: '<i class="fas fa-comment-dots"></i>',
    name: "The theory of evolution",
    created: "1624781856889",
    category: "Random thought",
    content: "The evolution is a process",
    dates: "",
  },
  {
    icon: '<i class="fas fa-exclamation-circle"></i>',
    name: "New Feature",
    created: "1631451856882",
    category: "Idea",
    content: "Introduce new improvements",
    dates: "",
  },
  {
    icon: '<i class="fas fa-shopping-cart"></i>',
    name: "Books",
    created: "1640564856434",
    category: "Task",
    content: "The lean startup",
    dates: "",
  },
  {
    icon: '<i class="fas fa-comment-dots"></i>',
    name: "About time",
    created: "1640781345270",
    category: "Random thought",
    content: "There is always not enough time",
    dates: "",
  },
  {
    icon: '<i class="fas fa-exclamation-circle"></i>',
    name: "SEO",
    created: "1640781456854",
    category: "Idea",
    content: "Delete unused scripts",
    dates: "",
  },
  {
    icon: '<i class="fas fa-shopping-cart"></i>',
    name: "Vacation",
    created: "1640781852345",
    category: "Task",
    content: "Book tickets to Italy",
    dates: "",
  },
];

export const icons = {
  idea: '<i class="fas fa-exclamation-circle"></i>',
  task: '<i class="fas fa-shopping-cart"></i>',
  thought: '<i class="fas fa-comment-dots"></i>',
};

export const cat = {
  idea: "Idea",
  task: "Task",
  thought: "Random thought",
};

export let activeCatCount = {
  idea: 2,
  task: 3,
  thought: 2,
};

export let archiveCatCount = {
  idea: 0,
  task: 0,
  thought: 0,
};
