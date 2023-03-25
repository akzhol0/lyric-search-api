const res = document.querySelector('#res');

document.querySelector('[data-search]').addEventListener('click', () => {
    document.querySelectorAll('.block').forEach((item) => {
        item.remove();
    });
    const inpvalue = document.querySelector('[data-input]').value;
    if (inpvalue.length <= 1) {
        res.textContent = `Name of the song is too short`;
        return;
    };
    const ajax = new XMLHttpRequest();
    ajax.open('GET', `https://api.lyrics.ovh/suggest/${inpvalue}`);
    ajax.addEventListener('load', () => {
        const response = JSON.parse(ajax.responseText).data;
        search(response, inpvalue);
    });
    ajax.send();
});

function search(req, inp) {
    if (req.length < 2) {
        document.querySelector('#res').textContent = `This song "${inp}" doesn't exist`;
        return;
    } res.textContent = '';

    req.forEach((item) => {
        const html =    `<div class="block">
                            <div class="title">
                                <img class="image" loading="eager" data-cover src="${item.album.cover}">
                                <div class="gay">
                                    <p><label data-artist>${item.artist.name}</label></p>
                                    <p><label data-title>${item.title}</label></p>
                                </div>
                            </div>
                            <a href="${item.link}" target="_blank"><div data-get-lyrics class="btn-get-lyrics">LYRICS</div></a>
                        </div>`;
        document.querySelector('[data-res]').insertAdjacentHTML('beforeend', html);
    });
}