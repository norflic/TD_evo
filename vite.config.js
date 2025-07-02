import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    root: 'src', // indique que le dossier 'src' est la racine du projet
    publicDir: path.resolve(__dirname, 'public'),
})