document.getElementById('cv-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario para mostrar el mensaje
    // Mostrar el modal
    var confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
});