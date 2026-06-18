const screens = Array.from(document.querySelectorAll('.app-screen'));
const DEFAULT_SCREEN = document.body.dataset.defaultScreen || screens[0]?.id || 'login';

const hasMobileLogin = Boolean(document.querySelector('#login'));
const protectedMobileScreens = new Set(['home', 'profile', 'travel', 'declarations', 'summary', 'faq']);

const VALID_EMAIL = 'usuario@email.com';
const VALID_PASSWORD = '12345678';

function getRequestedScreen(){
  return window.location.hash.replace('#', '') || DEFAULT_SCREEN;
}

function isAuthenticated(){
  return sessionStorage.getItem('sna-authenticated') === 'true';
}

function setMessage(elementId, message, type){
  const element = document.getElementById(elementId);
  if (!element) return;

  element.textContent = message;
  element.classList.remove('error', 'success');

  if (type) {
    element.classList.add(type);
  }
}

function generateProcedureCode(){
  const number = Math.floor(100000 + Math.random() * 899999);
  return `SNA-2026-${number}`;
}

function setSummary(type, status, source){
  sessionStorage.setItem('sna-summary-code', generateProcedureCode());
  sessionStorage.setItem('sna-summary-type', type);
  sessionStorage.setItem('sna-summary-status', status);
  sessionStorage.setItem('sna-summary-source', source || 'home');
}

function updateSummaryScreen(){
  const code = sessionStorage.getItem('sna-summary-code') || 'SNA-2026-000184';
  const type = sessionStorage.getItem('sna-summary-type') || 'Trámite fronterizo';
  const status = sessionStorage.getItem('sna-summary-status') || 'Recibido para revisión';

  const codeElement = document.getElementById('summary-code');
  const typeElement = document.getElementById('summary-type');
  const statusElement = document.getElementById('summary-status');
  const backElement = document.getElementById('summary-back');

  if (codeElement) codeElement.textContent = `Código: ${code}`;
  if (typeElement) typeElement.textContent = `Tipo: ${type}`;
  if (statusElement) statusElement.textContent = `Estado: ${status}`;
  if (backElement) backElement.setAttribute('href', `#${sessionStorage.getItem('sna-summary-source') || 'home'}`);
}

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPastDate(value){
  if (!value) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(`${value}T00:00:00`);
  return selectedDate < today;
}

function isValidVehiclePlate(plate){
  const cleanPlate = plate.toUpperCase().replace(/[\s-]/g, '');
  return /^[A-Z]{4}\d{2}$/.test(cleanPlate) || /^[A-Z]{2}\d{4}$/.test(cleanPlate);
}

function showScreen(){
  let requestedScreen = getRequestedScreen();

  if (hasMobileLogin && protectedMobileScreens.has(requestedScreen) && !isAuthenticated()) {
    requestedScreen = 'login';
    window.history.replaceState(null, '', '#login');
    setMessage('login-message', 'Debe iniciar sesión para acceder al Portal SNA.', 'error');
  }

  const targetScreen = screens.find((screen) => screen.id === requestedScreen);

  if (!targetScreen) {
    if (!screens.length) return;
    window.history.replaceState(null, '', `#${DEFAULT_SCREEN}`);
    showScreen();
    return;
  }

  screens.forEach((screen) => {
    const isActive = screen === targetScreen;
    screen.classList.toggle('active', isActive);
    screen.setAttribute('aria-hidden', String(!isActive));
  });

  document.querySelectorAll('.bottom a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${requestedScreen}`);
  });

  document.querySelectorAll('.desktop-nav a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${requestedScreen}`);
  });

  if (requestedScreen === 'summary') {
    updateSummaryScreen();
  }

  window.scrollTo({top:0, behavior:'auto'});
}

function setupLogin(){
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      sessionStorage.setItem('sna-authenticated', 'true');
      setMessage('login-message', 'Acceso autorizado. Redirigiendo al Portal SNA.', 'success');
      window.location.hash = '#home';
      return;
    }

    sessionStorage.removeItem('sna-authenticated');
    setMessage('login-message', 'Credenciales inválidas. Verifique correo y contraseña.', 'error');
  });
}

function setupSimulatedAccessButtons(){
  const actions = [
    ['claveunica-login', 'Clave Única no está conectada en este prototipo. Use usuario@email.com / 12345678.'],
    ['gmail-login', 'Gmail no está conectado en este prototipo. Use usuario@email.com / 12345678.'],
    ['gmail-register', 'Registro con Gmail simulado. Complete los datos para crear la cuenta de prueba.']
  ];

  actions.forEach(([buttonId, message]) => {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('click', () => {
      const targetMessage = buttonId === 'gmail-register' ? 'register-message' : 'login-message';
      setMessage(targetMessage, message, 'error');
    });
  });
}

function setupRegisterForm(){
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('register-name')?.value.trim() || '';
    const documentId = document.getElementById('register-id')?.value.trim() || '';
    const email = document.getElementById('register-email')?.value.trim() || '';
    const phone = document.getElementById('register-phone')?.value.trim() || '';
    const password = document.getElementById('register-password')?.value.trim() || '';

    if (name.length < 5 || documentId.length < 7 || !phone) {
      setMessage('register-message', 'Debe completar nombre, documento y teléfono para crear la cuenta.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('register-message', 'Debe ingresar un correo válido.', 'error');
      return;
    }

    if (password.length < 8) {
      setMessage('register-message', 'La contraseña debe tener al menos 8 caracteres.', 'error');
      return;
    }

    sessionStorage.setItem('sna-authenticated', 'true');
    setMessage('register-message', 'Cuenta de prueba creada correctamente.', 'success');
    window.location.hash = '#home';
  });
}

function setupProfileForm(){
  const form = document.getElementById('profile-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('profile-name')?.value.trim() || '';
    const email = document.getElementById('profile-email')?.value.trim() || '';
    const phone = document.getElementById('profile-phone')?.value.trim() || '';

    if (name.length < 5 || !phone || !isValidEmail(email)) {
      setMessage('profile-message', 'Revise nombre, correo y teléfono antes de guardar.', 'error');
      return;
    }

    setMessage('profile-message', 'Cambios guardados en la cuenta simulada.', 'success');
  });
}

function setupDeclarationForm(){
  const form = document.getElementById('declaration-form');
  if (!form) return;

  const productRadios = Array.from(document.querySelectorAll('input[name="animal-vegetal"]'));
  const productTypeElement = document.getElementById('product-type');
  const descriptionElement = document.getElementById('description');

  function syncDeclarationFields(){
    const hasProducts = document.querySelector('input[name="animal-vegetal"]:checked')?.value === 'si';

    if (productTypeElement) {
      productTypeElement.disabled = !hasProducts;
      productTypeElement.value = hasProducts && productTypeElement.value === 'No aplica' ? '' : productTypeElement.value;
      if (!hasProducts) productTypeElement.value = 'No aplica';
    }

    if (descriptionElement) {
      descriptionElement.disabled = !hasProducts;
      descriptionElement.value = hasProducts && descriptionElement.value === 'No porta productos declarables.'
        ? ''
        : descriptionElement.value;
      if (!hasProducts) descriptionElement.value = 'No porta productos declarables.';
    }
  }

  productRadios.forEach((radio) => radio.addEventListener('change', syncDeclarationFields));
  syncDeclarationFields();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const hasProducts = document.querySelector('input[name="animal-vegetal"]:checked')?.value === 'si';
    const productType = document.getElementById('product-type')?.value.trim();
    const description = document.getElementById('description')?.value.trim() || '';
    const truthDeclaration = document.getElementById('truth-declaration')?.checked;

    if (hasProducts && (!productType || productType === 'No aplica')) {
      setMessage('declaration-message', 'Debe seleccionar el tipo de producto declarado.', 'error');
      return;
    }

    if (hasProducts && description.length < 5) {
      setMessage('declaration-message', 'Debe describir brevemente los productos declarados.', 'error');
      return;
    }

    if (!truthDeclaration) {
      setMessage('declaration-message', 'Debe aceptar la declaración de veracidad antes de enviar.', 'error');
      return;
    }

    setSummary('Declaración SAG/Aduanas', 'Declaración enviada para revisión SAG/Aduanas', 'declarations');
    setMessage('declaration-message', 'Declaración registrada correctamente.', 'success');
    window.location.hash = '#summary';
  });
}

function isValidDocumentFile(file){
  if (!file) return false;

  const fileName = file.name.toLowerCase();
  const isPdf = file.type === 'application/pdf' || fileName.endsWith('.pdf');
  const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(fileName);

  return isPdf || isImage;
}

function setupTravelForm(){
  const form = document.getElementById('travel-form');
  const fileInput = document.getElementById('doc-upload');
  const travelTypeElement = document.getElementById('travel-type');

  if (!form) return;

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      const fileName = file ? file.name : 'Ningún archivo seleccionado';
      const fileNameElement = document.getElementById('doc-file-name');

      if (fileNameElement) {
        fileNameElement.textContent = fileName;
      }

      if (file && !isValidDocumentFile(file)) {
        setMessage('travel-message', 'Archivo rechazado: solo se aceptan PDF o imágenes.', 'error');
      } else {
        setMessage('travel-message', '', null);
      }
    });
  }

  if (travelTypeElement) {
    travelTypeElement.addEventListener('change', () => {
      const hint = document.getElementById('vehicle-hint');
      if (!hint) return;

      hint.textContent = travelTypeElement.value === 'Salida temporal desde Chile'
        ? 'Para salida temporal desde Chile se considera un plazo referencial de 180 días.'
        : 'Para ingreso temporal a Chile el trámite queda pendiente de validación en frontera.';
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const travelType = document.getElementById('travel-type')?.value.trim();
    const borderCrossing = document.getElementById('border-crossing')?.value.trim();
    const crossingDate = document.getElementById('crossing-date')?.value;
    const destination = document.getElementById('destination')?.value.trim();
    const vehiclePlate = document.getElementById('vehicle-plate')?.value.trim();

    const docId = document.getElementById('doc-id')?.checked;
    const docMinor = document.getElementById('doc-minor')?.checked;
    const docVehicleTemp = document.getElementById('doc-vehicle-temp')?.checked;
    const docVehicle = document.getElementById('doc-vehicle')?.checked;
    const hasMinor = document.getElementById('has-minor')?.checked;

    const file = document.getElementById('doc-upload')?.files[0];

    if (!travelType || !borderCrossing || !crossingDate || !destination) {
      setMessage('travel-message', 'Debe completar tipo de trámite, paso fronterizo, fecha y destino.', 'error');
      return;
    }

    if (isPastDate(crossingDate)) {
      setMessage('travel-message', 'La fecha estimada de cruce no puede ser anterior a hoy.', 'error');
      return;
    }

    if (!vehiclePlate) {
      setMessage('travel-message', 'Debe ingresar la patente del vehículo.', 'error');
      return;
    }

    if (!isValidVehiclePlate(vehiclePlate)) {
      setMessage('travel-message', 'Debe ingresar una patente válida, por ejemplo AB-CD-12 o AB-1234.', 'error');
      return;
    }

    if (!docId) {
      setMessage('travel-message', 'Debe marcar cédula o pasaporte vigente.', 'error');
      return;
    }

    if (!docVehicle) {
      setMessage('travel-message', 'Debe marcar documentos del vehículo.', 'error');
      return;
    }

    if (travelType === 'Salida temporal desde Chile' && !docVehicleTemp) {
      setMessage('travel-message', 'Para salida temporal debe marcar el documento de salida/admisión temporal del vehículo.', 'error');
      return;
    }

    if (hasMinor && !docMinor) {
      setMessage('travel-message', 'Si viaja menor de edad, debe marcar autorización notarial.', 'error');
      return;
    }

    if (!isValidDocumentFile(file)) {
      setMessage('travel-message', 'Debe adjuntar un archivo válido en formato PDF o imagen.', 'error');
      return;
    }

    const status = travelType === 'Salida temporal desde Chile'
      ? 'Viaje registrado. Plazo referencial de vehículo: 180 días'
      : 'Ingreso temporal registrado y pendiente de validación';

    setSummary('Registro de viaje terrestre', status, 'travel');
    setMessage('travel-message', 'Registro guardado correctamente.', 'success');
    window.location.hash = '#summary';
  });
}

function setupDesktopCaseFilters(){
  const searchInput = document.getElementById('case-search');
  const statusFilter = document.getElementById('case-status-filter');
  const caseCards = Array.from(document.querySelectorAll('.case-card'));
  const emptyState = document.getElementById('case-empty-state');

  if (!searchInput || !statusFilter || !caseCards.length) return;

  function applyFilters(){
    const query = searchInput.value.trim().toLowerCase();
    const status = statusFilter.value;
    let visibleCount = 0;

    caseCards.forEach((card) => {
      const text = `${card.dataset.caseCode || ''} ${card.dataset.casePerson || ''}`.toLowerCase();
      const matchesQuery = !query || text.includes(query);
      const matchesStatus = status === 'Todos' || card.dataset.caseStatus === status;
      const isVisible = matchesQuery && matchesStatus;

      card.classList.toggle('hidden', !isVisible);
      if (isVisible) visibleCount += 1;
    });

    if (emptyState) emptyState.classList.toggle('hidden', visibleCount > 0);
  }

  searchInput.addEventListener('input', applyFilters);
  statusFilter.addEventListener('change', applyFilters);
}

function setupFaqSearch(){
  const searchInput = document.getElementById('buscar-ayuda');
  const faqItems = Array.from(document.querySelectorAll('#faq details'));

  if (!searchInput || !faqItems.length) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    faqItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.classList.toggle('hidden', Boolean(query) && !text.includes(query));
    });
  });
}

function setupDesktopActionFeedback(){
  const exportCasesButton = document.getElementById('export-cases');
  const reportButton = document.getElementById('generate-report');
  const adminButton = document.getElementById('save-admin');
  const correctionButton = document.getElementById('request-correction');
  const approveButton = document.getElementById('approve-documents');
  const deriveSagButton = document.getElementById('derive-sag');
  const markReviewedButton = document.getElementById('mark-reviewed');
  const declarationStatus = document.getElementById('desktop-declaration-status');

  if (exportCasesButton) {
    exportCasesButton.addEventListener('click', () => {
      setMessage('cases-message', 'Listado exportado de forma simulada.', 'success');
    });
  }

  if (reportButton) {
    reportButton.addEventListener('click', () => {
      setMessage('report-message', 'Reporte PDF generado en modo simulado.', 'success');
    });
  }

  if (adminButton) {
    adminButton.addEventListener('click', () => {
      setMessage('admin-message', 'Configuración guardada en la sesión simulada.', 'success');
    });
  }

  if (correctionButton) {
    correctionButton.addEventListener('click', () => {
      setMessage('review-message', 'Corrección solicitada al pasajero. Estado: Observado.', 'error');
    });
  }

  if (approveButton) {
    approveButton.addEventListener('click', () => {
      setMessage('review-message', 'Documentación aprobada para validación en frontera.', 'success');
    });
  }

  if (deriveSagButton) {
    deriveSagButton.addEventListener('click', () => {
      if (declarationStatus) {
        declarationStatus.textContent = 'Derivada a SAG';
        declarationStatus.className = 'status-pill observed';
      }
      setMessage('declaration-desktop-message', 'Declaración derivada a revisión SAG.', 'error');
    });
  }

  if (markReviewedButton) {
    markReviewedButton.addEventListener('click', () => {
      if (declarationStatus) {
        declarationStatus.textContent = 'Revisada';
        declarationStatus.className = 'status-pill approved';
      }
      setMessage('declaration-desktop-message', 'Declaración marcada como revisada.', 'success');
    });
  }

  document.querySelectorAll('[data-resolution]').forEach((button) => {
    button.addEventListener('click', () => {
      const resolution = button.dataset.resolution;
      setMessage('resolution-message', `Resolución simulada registrada: ${resolution}.`, 'success');
    });
  });
}

function setupDesktopIntegrations(){
  const button = document.getElementById('run-integrations');
  if (!button) return;

  button.addEventListener('click', () => {
    const sagStatus = document.getElementById('sag-status');
    const pdiStatus = document.getElementById('pdi-status');
    const argStatus = document.getElementById('arg-status');

    if (sagStatus) sagStatus.textContent = 'Consultando...';
    if (pdiStatus) pdiStatus.textContent = 'Consultando...';
    if (argStatus) argStatus.textContent = 'Consultando...';
    setMessage('integration-message', 'Consultando servicios externos simulados...', 'success');

    window.setTimeout(() => {
      const time = new Date().toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'});

      if (sagStatus) sagStatus.textContent = 'Revisión SAG recomendada por producto declarado';
      if (pdiStatus) pdiStatus.textContent = 'Identidad validada correctamente';
      if (argStatus) argStatus.textContent = 'Respuesta simulada recibida';

      setMessage('integration-message', `Validación externa simulada ejecutada correctamente a las ${time}.`, 'success');
    }, 600);
  });
}

if (!window.location.hash) {
  window.history.replaceState(null, '', `#${DEFAULT_SCREEN}`);
}

setupLogin();
setupSimulatedAccessButtons();
setupRegisterForm();
setupProfileForm();
setupDeclarationForm();
setupTravelForm();
setupFaqSearch();
setupDesktopCaseFilters();
setupDesktopActionFeedback();
setupDesktopIntegrations();

showScreen();
window.addEventListener('hashchange', showScreen);
