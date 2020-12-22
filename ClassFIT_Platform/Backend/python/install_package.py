import sys
import os

def install_pkg() :
    print(sys.argv[1])

    f = open(sys.argv[1], 'r')
    lines = f.readlines()

    pipCommand = 'pip install '
    for i in lines :
        os.system(pipCommand + i)
    # ../../python/install_package.py ./PreProcess_package.txt

    return 0


if __name__ == "__main__" :
    install_pkg()