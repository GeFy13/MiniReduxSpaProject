export class BackgroundView {
    constructor(container) {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.boxSizing = 'border-box';

        this.container = container;
        this.render();
    }

    render() {
        const view = document.createElement('div');
        view.id = 'container';
        view.style.width = '100%';
        view.style.height = '1px';
        view.style.minHeight = '100vh';
        view.style.display = 'flex';
        view.style.justifyContent = 'center';
        view.style.alignItems = 'center';
        view.style.flexDirection = 'column';
        view.style.boxSizing = 'border-box';
        view.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        view.style.fontFamily = 'Arial, sans-serif';
        view.style.padding = '20px';
        view.style.gap = '10px';

        this.container.innerHTML = '';
        this.container.appendChild(view);
    }
}