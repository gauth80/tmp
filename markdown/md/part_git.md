

## Github et Git
Ces deux technologies de versioning sont utilisée dans le développement afin d'enregistrée des versions de projets sur des dêpots (local comme distant). Il servent aussi entre autre à colaborée avec d'autres développeurs sur un même projet commun.

Pour réaliser le fil rouge surtout en période Covid, il fallais obligatoirement passer par cette technologie, bien que pas demandée dans les compétances je tenais tout de même à présentée ce merveilleux outil qui ma donnée des sueurs froides par moment.

Je ne présenterais pas Github sur sa forme générale, en revanche je présente l'outil Git bash et quelque commande pour moi indispensable pour réaliser un site avec d'autres colaborateur.

### Récupéré un dépot existant
```git
$ git init
$ git clone <Le path du dépot existant>

```
Cette commande permet comme son nom l'indique de cloner un dépot distant sur votre machine en local donc. Ce méthode permet aussi de récupérée les remotes du dépot distant.

### Récupéré des changements

```git
$ git pull origin master

```
Cette commande permet de fetch et pull une version actuelle d'un dépot distant, cela permet autre entre d'apportée des modifications à votre dépot local.


### Ajoutée un remote
```git

$ git remote add <Mettre le nom du remote> <le path du depot distant> 
$ git remote -v

```

Parfois les dépot non pas de remote préconfigurée, ce qui est embétant sans sa impossible d'accédée aux dépôt distant, dans ce contexte il faudras ajoutée ce remote. Notée qu'un dépot peu avoir plusieurs remote, d'où l'importance de nommée ces remotes, par défaut le nom du remote est origin.

Remote -v permet de visualisée les remote disponible sur le dépot.

### Connaitre l'état de votre dépot
```git
$ git status

```
Cette simple commande est une mine d'information permettant de résoudre parfois vos conflits, elle indique l'etat actuel de votre dépot, si des commits sont présents, si des commits ne sont pas encore enregistrée **unstaged**, si votre branche diverge avec une autre.

### git add et commit
```git
$ git status
$ git add .
$ git commit -a -m 'style(view/acceuil) : marge définit'

```
Git add . ajoute tous les fichiers modifier (update et delete) 

Git commit -a (et non amend ^^) traque tous les changements sa équivaut a git add --all et git add .

Le drapeau -m permet de modifier la description sans passer par **Vim**.
Enfin la description est une norme de nommage que l'ont retrouve parfois sur github ou sur Angular.
On définit se que l'ont fais, ici la mise en page, ont définit sa portée (views/page) et ont ajoute un bref descriptions des actions réaliser.

### Push ces modifications local à distant

```git
$ git status
$ git checkout <ma branche>
$ git remote -v
$ git push <nomDuRemote> <ma branche>

```

git checkout permet de switcher de branche, il est déconseillé d'apportée des modifications directements sur la branche master. push pousse les commits sur votre branche distante en se basant sur le nom du remote.

### Appliquée ces changements sur le master (ou autre branche)
Il est possible de passez par Github pour fusionné sa branche avec le master et ainsi d'appliquée des changement sur ce dernier, cotée Git:

```git
    $ git status
    $ git merge <la branche a fusionnée>
    
```
Note: IL est préférable avant de merge de pull-request la branche master afin d'accérir les dernières modifications du dépot distant et d'évitée un tour dans rebase.

### Autre commande sympas

###### Git diff
```git
    $ git status
    $ git diff
```
Permet de voir les changements opérée.

###### Git log
```git
    $ git log --oneline --graph --color
    
```
Montre un graphique de chaque branche sur le dépôt local, ceci se base sur votre dernière mise à jour de l'historique.

### Commande dangereuse
Commande à se renseigner avant utilisation

```
$ git reset Head~<nombre en arrière>
$ git revers <numeroDuCommit>
$ git prune <branch> -D
$ git commit --amend
$ git reset --hard

```

Cette liste de commande est a voir en dernier reccours.

    










