/**
 * Channel video wall: YouTube videos from English with Ms Tuyen.
 * Live videos load a privacy-enhanced (youtube-nocookie) player only after a tap.
 * Scheduled videos show a "Coming" card with the date and switch to playable
 * automatically once publish_at has passed (if a youtube_id is set).
 */
(function () {
    const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

    function isLive(v) {
        return !!v.youtube_id && new Date(v.publish_at).getTime() <= Date.now();
    }

    function watchUrl(v) {
        return v.type === 'short'
            ? `https://www.youtube.com/shorts/${v.youtube_id}`
            : `https://www.youtube.com/watch?v=${v.youtube_id}`;
    }

    function el(tag, cls, text) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text) e.textContent = text;
        return e;
    }

    function playInto(box, v) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${v.youtube_id}?autoplay=1&rel=0&playsinline=1`;
        iframe.title = v.title;
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        box.replaceChildren(iframe);
        box.classList.add('playing');
    }

    function card(v) {
        const live = isLive(v);
        const c = el('article', `vcard ${v.type} ${live ? 'live' : 'soon'}`);
        c.dataset.letter = v.letter;

        const media = el('div', 'vcard-media');
        if (live) {
            const btn = el('button', 'vcard-play');
            btn.setAttribute('aria-label', `Play: ${v.title}`);
            const img = document.createElement('img');
            img.src = `https://i.ytimg.com/vi/${v.youtube_id}/hqdefault.jpg`;
            img.alt = v.title;
            img.loading = 'lazy';
            btn.append(img, el('span', 'vcard-play-icon', '▶'));
            btn.addEventListener('click', () => {
                if (window.kidsAudio) window.kidsAudio.playPop();
                playInto(media, v);
            });
            media.append(btn);
        } else {
            const ph = el('div', 'vcard-soon');
            const out = new Date(v.publish_at).getTime() <= Date.now();
            ph.append(el('span', 'vcard-soon-letter', v.letter), el('span', 'vcard-soon-tag', out ? 'On YouTube' : 'Coming soon'));
            media.append(ph);
        }
        c.append(media);

        const body = el('div', 'vcard-body');
        body.append(el('span', 'vcard-badge', v.type === 'short' ? 'Short' : 'Lesson'));
        body.append(el('h3', 'vcard-title', v.title));
        const when = new Date(v.publish_at);
        if (live) {
            const a = el('a', 'vcard-link', 'Watch on YouTube');
            a.href = watchUrl(v);
            a.target = '_blank';
            a.rel = 'noopener';
            body.append(a);
        } else if (when.getTime() <= Date.now()) {
            const a = el('a', 'vcard-link', 'Find it on our channel');
            a.href = window.CHANNEL.url;
            a.target = '_blank';
            a.rel = 'noopener';
            body.append(a);
        } else {
            body.append(el('p', 'vcard-date', `🗓️ ${fmt.format(when)}`));
        }
        c.append(body);
        return c;
    }

    function render() {
        const grid = document.getElementById('channelVideoGrid');
        if (!grid || !window.CHANNEL_VIDEOS) return;
        const vids = window.CHANNEL_VIDEOS.slice();
        const live = vids.filter(isLive).sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at));
        const soon = vids.filter(v => !isLive(v)).sort((a, b) => new Date(a.publish_at) - new Date(b.publish_at));
        grid.replaceChildren(...live.map(card), ...soon.map(card));
    }

    /** Highlight the video for a letter (used by the Video button in tracing). */
    function focusLetter(ch) {
        const target = document.querySelector(`.vcard[data-letter="${ch}"]`);
        document.querySelectorAll('.vcard.focus').forEach(e => e.classList.remove('focus'));
        if (target) {
            target.classList.add('focus');
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    window.channelVideos = { render, focusLetter };
})();
