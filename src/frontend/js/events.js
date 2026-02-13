/**
 * Shared event rendering module for CAPHE.
 * Fetches events from /api/events and renders them into a container.
 */

(function() {
  'use strict';

  const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function formatEventDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return {
      month: MONTH_NAMES[d.getMonth()],
      day: d.getDate()
    };
  }

  function formatFullDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  function renderEventCard(event, variant) {
    const { month, day } = formatEventDate(event.date);
    const isFree = !event.members_only;
    const badgeHtml = isFree
      ? '<span class="event-badge event-badge-free">Free</span>'
      : '<span class="event-badge">Members</span>';

    if (variant === 'compact') {
      // Programs page style — compact cards with registration link
      const linkHtml = event.status === 'upcoming' && event.registration_url
        ? `<a href="${event.registration_url}" target="_blank" class="card-link">Register →</a>`
        : event.status === 'upcoming' && event.link
          ? `<a href="${event.link}" target="_blank" class="card-link">Join →</a>`
          : '';

      return `
        <div class="card event-card event-card-compact">
          <div class="event-date">
            <div class="event-date-month">${month}</div>
            <div class="event-date-day">${day}</div>
          </div>
          <div class="event-content">
            <div class="event-type">${event.type} ${badgeHtml}</div>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-meta">${event.time} · Virtual</div>
            ${linkHtml}
          </div>
        </div>`;
    }

    if (variant === 'full') {
      // Dashboard style — full cards with join link
      const linkHtml = event.status === 'upcoming' && event.link
        ? `<a href="${event.link}" target="_blank" rel="noopener" class="btn btn-link mt-sm">Join →</a>`
        : '';

      return `
        <div class="card event-card">
          <div class="event-date">
            <div class="event-date-month">${month}</div>
            <div class="event-date-day">${day}</div>
          </div>
          <div class="event-content">
            <div class="event-type">${event.type} ${badgeHtml}</div>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-meta">${event.time}</div>
            ${linkHtml}
          </div>
        </div>`;
    }

    if (variant === 'archive') {
      // Past events page — includes description and recording link
      const speakerHtml = event.speaker
        ? `<div class="event-meta" style="margin-top: var(--space-xs);"><strong>Speaker:</strong> ${event.speaker}</div>`
        : '';
      const descHtml = event.description
        ? `<p class="event-description">${event.description}</p>`
        : '';
      const recordingHtml = event.recording_url
        ? `<a href="${event.recording_url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm mt-sm">Watch Recording →</a>`
        : '';

      return `
        <div class="card event-card">
          <div class="event-date">
            <div class="event-date-month">${month}</div>
            <div class="event-date-day">${day}</div>
          </div>
          <div class="event-content">
            <div class="event-type">${event.type} ${badgeHtml}</div>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-meta">${formatFullDate(event.date)} · ${event.time}</div>
            ${speakerHtml}
            ${descHtml}
            ${recordingHtml}
          </div>
        </div>`;
    }

    // Default fallback — same as full
    return renderEventCard(event, 'full');
  }

  async function fetchEvents(filter, type, limit) {
    const params = new URLSearchParams();
    if (filter) params.set('filter', filter);
    if (type) params.set('type', type);
    if (limit) params.set('limit', limit);

    const response = await fetch('/api/events?' + params.toString());
    if (!response.ok) throw new Error('Failed to fetch events');
    const data = await response.json();
    return data.events;
  }

  async function renderEventList(containerId, filter, type, variant, limit, emptyMessage) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const events = await fetchEvents(filter, type, limit);

      if (events.length === 0) {
        container.innerHTML = `
          <div class="card" style="text-align: center; padding: var(--space-xl); grid-column: 1 / -1;">
            <p style="color: var(--color-text-muted);">
              ${emptyMessage || 'No events scheduled at this time.'}
            </p>
            ${filter === 'upcoming' ? '<a href="/past-events" class="card-link">View past events →</a>' : ''}
          </div>`;
        return;
      }

      container.innerHTML = events.map(e => renderEventCard(e, variant)).join('');
    } catch (error) {
      console.error('Error loading events:', error);
      container.innerHTML = '<p style="color: var(--color-text-muted);">Unable to load events.</p>';
    }
  }

  // Expose globally
  window.CAPHEEvents = {
    fetchEvents: fetchEvents,
    renderEventCard: renderEventCard,
    renderEventList: renderEventList
  };
})();
