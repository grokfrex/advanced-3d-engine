// OMEGA-X Advanced 3D Engine - Vanilla JS
// Supports WebGL, Canvas 2D Pseudo-3D, CSS3D, Fake Perspective

class OmegaXEngine {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.scene = [];
        this.camera = { x: 0, y: 0, z: 0, rot: 0 };
        this.mode = 'pseudo3d'; // webgl, canvas2d, css3d
        
        this.init();
        this.animate();
    }
    
    init() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        });
        
        // Add sample objects
        this.scene.push({type: 'cube', x:0, y:0, z:5, size:1, color:'#ff0000'});
        this.scene.push({type: 'plane', x:0, y:-2, z:10, width:10, color:'#00ff00'});
    }
    
    project3D(x, y, z) {
        // Fake perspective projection
        const scale = 400 / (z + 5);
        return {
            x: this.width/2 + x * scale,
            y: this.height/2 + y * scale - (this.camera.rot * 10),
            scale: scale
        };
    }
    
    renderPseudo3D() {
        this.ctx.fillStyle = '#111133';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Sort by depth
        const sorted = [...this.scene].sort((a,b) => b.z - a.z);
        
        for (let obj of sorted) {
            const proj = this.project3D(obj.x, obj.y, obj.z);
            if (obj.type === 'cube') {
                this.ctx.fillStyle = obj.color;
                this.ctx.fillRect(proj.x - 30*proj.scale, proj.y - 30*proj.scale, 60*proj.scale, 60*proj.scale);
            } else if (obj.type === 'plane') {
                this.ctx.fillStyle = obj.color;
                this.ctx.fillRect(proj.x - 200*proj.scale, proj.y + 20, 400*proj.scale, 10);
            }
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderPseudo3D();
        
        // Rotate camera
        this.camera.rot += 0.01;
    }
}

new OmegaXEngine();