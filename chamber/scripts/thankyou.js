/* ========== Thank You Page Form Data Display ========== */

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Display form data
document.getElementById('display-name').textContent = `${urlParams.get('first-name') || ''} ${urlParams.get('last-name') || ''}`.trim();
document.getElementById('display-email').textContent = urlParams.get('email') || '';
document.getElementById('display-phone').textContent = urlParams.get('phone') || '';
document.getElementById('display-business').textContent = urlParams.get('business-name') || '';

// Format membership level
const membership = urlParams.get('membership');
const membershipDisplay = {
    'nonprofit': 'Non-profit Membership',
    'bronze': 'Bronze Membership', 
    'silver': 'Silver Membership',
    'gold': 'Gold Membership'
};
document.getElementById('display-membership').textContent = membershipDisplay[membership] || '';

// Format timestamp
const timestamp = urlParams.get('timestamp');
if (timestamp) {
    const date = new Date(timestamp);
    document.getElementById('display-timestamp').textContent = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}