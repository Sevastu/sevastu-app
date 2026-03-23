export const CATEGORIES = [
    { id: '1', name: 'Electrician', iconName: 'zap' },
    { id: '2', name: 'Plumber', iconName: 'droplet' },
    { id: '3', name: 'Maid', iconName: 'home' },
    { id: '4', name: 'AC Repair', iconName: 'wind' },
];

export const WORKERS = [
    {
        id: 'w1',
        name: 'Rajesh Kumar',
        rating: 4.8,
        price: 450,
        category: 'Electrician',
        skills: ['Wiring', 'Appliance Repair', 'Installation'],
        completedJobs: 124,
    },
    {
        id: 'w2',
        name: 'Sunita Sharma',
        rating: 4.9,
        price: 300,
        category: 'Maid',
        skills: ['Cleaning', 'Cooking', 'Washing'],
        completedJobs: 89,
    },
    {
        id: 'w3',
        name: 'Amit Singh',
        rating: 4.6,
        price: 500,
        category: 'Plumber',
        skills: ['Pipe Fitting', 'Leak Repair'],
        completedJobs: 56,
    },
    {
        id: 'w4',
        name: 'Vikram Patel',
        rating: 4.7,
        price: 600,
        category: 'AC Repair',
        skills: ['AC Servicing', 'Gas Refill', 'Installation'],
        completedJobs: 210,
    },
];

export const BOOKINGS = [
    {
        id: 'b1',
        workerId: 'w1',
        workerName: 'Rajesh Kumar',
        date: '2026-03-22',
        time: '14:00',
        status: 'ongoing',
        service: 'Electrician',
    },
    {
        id: 'b2',
        workerId: 'w2',
        workerName: 'Sunita Sharma',
        date: '2026-03-15',
        time: '10:00',
        status: 'completed',
        service: 'Maid',
    },
];
