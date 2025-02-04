// Your code here.
let draggedCube = null;
let offsetX = 0;
let offsetY = 0;

const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

cubes.forEach(cube => {
  // Mouse Down Event (Start Drag)
  cube.addEventListener('mousedown', (event) => {
    draggedCube = cube;
    offsetX = event.clientX - cube.getBoundingClientRect().left;
    offsetY = event.clientY - cube.getBoundingClientRect().top;

    // Add 'dragging' class to give visual feedback
    cube.style.transition = 'none';  // Disable transition during drag

    document.addEventListener('mousemove', onMouseMove); // Enable mousemove
    document.addEventListener('mouseup', onMouseUp); // Enable mouseup
  });
});

// Mousemove Event (During Drag)
function onMouseMove(event) {
  if (draggedCube) {
    let newLeft = event.clientX - offsetX;
    let newTop = event.clientY - offsetY;

    // Ensure the cube stays within the container boundaries
    const containerRect = container.getBoundingClientRect();

    if (newLeft < containerRect.left) newLeft = containerRect.left;
    if (newTop < containerRect.top) newTop = containerRect.top;
    if (newLeft + draggedCube.offsetWidth > containerRect.right) {
      newLeft = containerRect.right - draggedCube.offsetWidth;
    }
    if (newTop + draggedCube.offsetHeight > containerRect.bottom) {
      newTop = containerRect.bottom - draggedCube.offsetHeight;
    }

    // Update cube position
    draggedCube.style.left = newLeft - containerRect.left + 'px';
    draggedCube.style.top = newTop - containerRect.top + 'px';
  }
}

// Mouseup Event (End Drag)
function onMouseUp(event) {
  if (draggedCube) {
    // Stop moving the cube and remove event listeners
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // Re-enable transition for smooth snap back (optional)
    draggedCube.style.transition = 'transform 0.1s ease';
    draggedCube = null;
  }
}
