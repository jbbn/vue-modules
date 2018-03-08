init:
	yarn install

clean:
	find . -name "node_modules" -exec rm -rf '{}' +

unit:
	clear
	yarn mocha --require babel-register

docs:
	yarn documentation readme index.js --section=Docs
