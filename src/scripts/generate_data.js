/*
Node script to generate events.json and guests.json inside src/data
Usage:
  node .\src\scripts\generate_data.js --guests=1200 --events=6
*/

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--')) {
      const [k, v] = arg.slice(2).split('=');
      args[k] = v === undefined ? true : v;
    }
  }
  return args;
}

const args = parseArgs();
const TOTAL_GUESTS = parseInt(args.guests || args.guest || '1200', 10) || 1200;
const TOTAL_EVENTS = parseInt(args.events || args.event || '6', 10) || 6;
const OUT_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function generateEvents(n) {
  const events = [];
  const now = new Date();
  for (let i = 1; i <= n; i++) {
    const start = new Date(now.getTime() + i * 86400000);
    events.push({
      id: `event-${i}`,
      title: `Sample Event ${i}`,
      date: start.toISOString(),
      location: `Venue ${((i - 1) % 10) + 1}`,
      description: `Description for sample event ${i}`,
      capacity: 500 + i * 10,
    });
  }
  return events;
}

function generateGuests(totalGuests, totalEvents) {
  const ticketTypes = ['VIP', 'Regular', 'Staff'];
  const guests = [];
  for (let i = 1; i <= totalGuests; i++) {
    const eventId = `event-${((i - 1) % totalEvents) + 1}`;
    const name = `Guest ${i}`;
    const email = `guest${i}@example.com`;
    const eventGuestIndex = Math.floor((i - 1) / totalEvents);
    const ticketType = ticketTypes[eventGuestIndex % ticketTypes.length];
    const checkedIn = i % 7 === 0;
    const company = `Company ${((i - 1) % 200) + 1}`;
    const row = String.fromCharCode(65 + ((i - 1) % 20));
    const seat = `${row}${(i % 100) + 1}`;

    guests.push({
      id: `guest-${i}`,
      eventId,
      name,
      email,
      ticketType,
      checkedIn,
      company,
      seat,
    });
  }
  return guests;
}

const events = generateEvents(TOTAL_EVENTS);
const guests = generateGuests(TOTAL_GUESTS, TOTAL_EVENTS);

fs.writeFileSync(
  path.join(OUT_DIR, 'events.json'),
  JSON.stringify(events, null, 2),
);
fs.writeFileSync(
  path.join(OUT_DIR, 'guests.json'),
  JSON.stringify(guests, null, 2),
);

console.log(
  `Wrote ${events.length} events and ${guests.length} guests to ${OUT_DIR}`,
);
