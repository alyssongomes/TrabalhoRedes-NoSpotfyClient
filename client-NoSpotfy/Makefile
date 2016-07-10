run:
	@echo "Rodando aplicação"
	@node_modules/electron-prebuilt/cli.js .
	@echo "Fechando!"

build:
	@echo "Exportando aplicação para a plataforma Linux x64"
	@mkdir -p bin/
	@electron-packager . NoSpotify --platform=linux --arch=x64 --out=bin/ --overwrite
	@echo "Exportado para a pasta bin/"
