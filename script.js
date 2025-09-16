// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Carregar materiais dinamicamente nas páginas de ano
    if (document.querySelector('.topics-container')) {
        loadMaterials();
    }
});

// Função para carregar materiais do JSON
async function loadMaterials() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }
        
        const data = await response.json();
        const year = document.body.classList.contains('ano1') ? '1ano' : 
                    document.body.classList.contains('ano2') ? '2ano' : '3ano';
        
        displayMaterials(data[year]);
    } catch (error) {
        console.error('Erro:', error);
        document.querySelector('.topics-container').innerHTML = `
            <div class="error-message">
                <p>Erro ao carregar os materiais. Por favor, tente novamente mais tarde.</p>
            </div>
        `;
    }
}

// Função para exibir os materiais na página
function displayMaterials(yearData) {
    const topicsContainer = document.querySelector('.topics-container');
    
    if (!yearData || yearData.length === 0) {
        topicsContainer.innerHTML = `
            <div class="no-materials">
                <p>Nenhum material disponível no momento.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    yearData.forEach(topic => {
        html += `
            <div class="topic">
                <div class="topic-header">${topic.topico}</div>
                <div class="materials-list">
        `;
        
        topic.materiais.forEach(material => {
            const iconClass = getFileIcon(material.tipo);
            
            html += `
                <div class="material-item">
                    <div class="material-info">
                        <i class="${iconClass} file-icon"></i>
                        <span>${material.nome}</span>
                    </div>
                    <a href="${material.link}" class="download-btn" target="_blank">
                        <i class="fas fa-download"></i> Baixar
                    </a>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    topicsContainer.innerHTML = html;
}

// Função para obter ícone baseado no tipo de arquivo
function getFileIcon(fileType) {
    switch(fileType.toLowerCase()) {
        case 'pdf':
            return 'fas fa-file-pdf';
        case 'pptx':
        case 'ppt':
            return 'fas fa-file-powerpoint';
        case 'docx':
        case 'doc':
            return 'fas fa-file-word';
        case 'xlsx':
        case 'xls':
            return 'fas fa-file-excel';
        case 'zip':
        case 'rar':
            return 'fas fa-file-archive';
        default:
            return 'fas fa-file';
    }
}
